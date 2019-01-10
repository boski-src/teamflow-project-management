import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup';
import { SigninComponent } from './signin';
import { RequestPasswordComponent } from './request-password';
import { NewPasswordComponent } from './new-password';

const routes : Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'request-password', component: RequestPasswordComponent },
      { path: 'new-password/:userId/:token', component: NewPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
