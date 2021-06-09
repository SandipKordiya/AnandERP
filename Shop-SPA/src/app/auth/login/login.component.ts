import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  model: any = {};
  isLoading = false;
  button = 'Submit';
  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }


  login() {
    // this.spinner.show();
    this.isLoading = true;
    this.button = 'Processing';
    this.authService.login(this.model).subscribe(next => {
      // this.spinner.hide();
      // this.loginForm.reset(this.model);
      this.isLoading = false;
      this.button = 'Submit';
      this.alertify.success('Logged in successfully');
      this.router.navigate(['/dashboard']);
    }, error => {
      this.spinner.hide();
      console.log(error);
      this.alertify.error(error.statusText);
      this.isLoading = false;
      this.button = 'Submit';
    }, () => {
      // this.loginForm.reset(this.model);

      this.router.navigate(['/dashboard']);
    });
  }
}
