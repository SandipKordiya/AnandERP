import { AuthService } from './../_services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertifyService } from '../_services/alertify.service';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertifyService
  ]
})
export class AuthModule { }
