import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IAuthRepositoryService } from './auth-repository.service.interface';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService implements IAuthRepositoryService {

  private ENDPOINT = '/auth';

  constructor (private httpClient : HttpClient) { }

  public createAccount (data) {
    return this.httpClient.post(`${this.ENDPOINT}/local/create`, data)
      .pipe<{ token : string, user : User }>(
        map<any, { token : string, user : User }>(({ data }) => data)
      );
  }

  public login (data) {
    return this.httpClient.post(`${this.ENDPOINT}/local`, data)
      .pipe<string>(
        map<any, string>(({ data }) => data)
      );
  }

  public loginFacebook (accessToken : string, refreshToken : string) {
    return this.httpClient.post(`${this.ENDPOINT}/facebook`, {
      access_token: accessToken,
      refresh_token: refreshToken
    })
      .pipe<string>(
        map<any, string>(({ data }) => data)
      );
  }

}
