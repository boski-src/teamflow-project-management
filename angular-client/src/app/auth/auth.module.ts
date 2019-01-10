import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { SharedModule } from '../shared';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

import { SignupComponent, SignupFormComponent } from './signup';
import { SigninComponent, SigninFormComponent } from './signin';
import { RequestPasswordComponent, RequestPasswordFormComponent } from './request-password';
import { NewPasswordComponent, NewPasswordFormComponent } from './new-password';

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    SignupFormComponent,
    SigninComponent,
    SigninFormComponent,
    RequestPasswordComponent,
    RequestPasswordFormComponent,
    NewPasswordComponent,
    NewPasswordFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {}
