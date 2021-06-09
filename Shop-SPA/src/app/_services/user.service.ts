import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addMember(model: any) {
    return this.http.post(this.baseUrl + 'auth/register', model);
  }

  getMembers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user');
  }
}
