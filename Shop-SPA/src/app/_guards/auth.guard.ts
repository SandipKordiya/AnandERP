import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
              private alertify: AlertifyService) { }
  // canActivate(): boolean {
  //   if (this.authService.loggedIn()) {
  //     return true;
  //   }

  //   this.alertify.error('you shall not pass!!!');
  //   this.router.navigate(['/auth/login']);
  //   return false;
  // }
  canActivate(next: ActivatedRouteSnapshot,  state: RouterStateSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string>;
    console.log('roles',roles);
    if(roles) {
      const match = this.authService.roleMatch(roles);
      if(match) {
        return true;
      } else {
        this.router.navigate(['dashboard']);
        this.alertify.error('You are not authorised to access this area.');
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }
 
    this.alertify.error('you shall not pass!!!');
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
