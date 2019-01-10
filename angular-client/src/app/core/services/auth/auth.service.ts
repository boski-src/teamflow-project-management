import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../../environments/environment';

import { AuthRepositoryService } from '../../repositories';
import { SessionService } from '../session/session.service';

declare const FB : any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (
    private http : HttpClient,
    private authRepository : AuthRepositoryService,
    private sessionService : SessionService,
    private toastrService : ToastrService
  ) {
    FB.init({
      appId: environment.fbAppId,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.2'
    });
  }

  public basicLogin (data) : void {
    this.authRepository.login(data)
      .subscribe(
        (data) => this.sessionService.set(data),
        () => this.toastrService.warning('Email or password is invalid.')
      );
  }

  public basicCreate (input) : void {
    this.authRepository.createAccount(input)
      .subscribe(data => this.sessionService.set(data.token));
  }

  public facebookLogin () {
    FB.login(res => {
      if (res.authResponse) {
        const { accessToken, refreshToken } = res.authResponse;
        this.authRepository.loginFacebook(accessToken, refreshToken)
          .subscribe(data => this.sessionService.set(data));
      }
    }, { scope: 'public_profile,email' });
  }

}
