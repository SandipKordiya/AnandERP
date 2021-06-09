import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { onMainContentChange } from './animations/animations';
import { AuthService } from './_services/auth.service';
import { SidenavService } from './_services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ onMainContentChange ]
})
export class AppComponent implements OnInit{
  title = 'Shop-SPA';
  public onSideNavChange: boolean;
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, private router: Router,
              private spinner: NgxSpinnerService,
              private _sidenavService: SidenavService) {}
  ngOnInit() {
    // this.spinner.show();
    // if (this.loggedIn) {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    //   }
    //   this.router.navigate(['/dashboard']);
    // }
    // this.spinner.hide();
    // this._sidenavService.sideNavState$.subscribe( res => {
    //   console.log(res)
    //   this.onSideNavChange = res;
    // })
  }

   loggedIn() {
    return this.authService.loggedIn();
   }
}
