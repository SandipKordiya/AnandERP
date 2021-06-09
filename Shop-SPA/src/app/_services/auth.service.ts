import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  currentRole: any;
  currentBranchId: number;
  currentBranchName: any;

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }


  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: any) => {
          
          const user = response;
          console.log('response', response);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log('decodedToken',this.decodedToken)
          if (user) {
            localStorage.setItem('token', user.token);
            this.setCurrentUser(user.user);            
            localStorage.setItem('user', JSON.stringify(user.user));
            localStorage.setItem('role', this.jwtHelper.decodeToken(localStorage.getItem('token')).role);
            localStorage.setItem('userId', user.user.id);
            localStorage.setItem('branchId', user.user.branchId);
            localStorage.setItem('branchName', user.user.branch.name);
            this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            this.currentUser = user.user;
            this.currentBranchId = user.user.branchId;
            console.log('this.decodedToken', this.decodedToken)
            this.currentBranchName = user.user.branchName;
          }
        })
      );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    console.log('decode user',this.getDecodedToken(localStorage.getItem('token')))
    const roles = this.getDecodedToken(localStorage.getItem('token')).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  getDecodedToken(token) {
    // return JSON.parse(atob(token.split('.')[1]));
    return this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    this.currentRole = localStorage.getItem('role');
    const userRoles = this.currentRole as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

}
