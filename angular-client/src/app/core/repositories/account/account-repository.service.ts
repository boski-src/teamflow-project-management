import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IAccountRepositoryService } from './account-repository.service.interface';
import { UserAccount, UserAuth, UserProfile } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AccountRepositoryService implements IAccountRepositoryService {

  private ENDPOINT = '/account';

  constructor (private httpClient : HttpClient) { }

  public getCurrent () {
    return this.httpClient.get(this.ENDPOINT)
      .pipe<UserAccount>(
        map<any, UserAccount>(({ data }) => new UserAccount(data))
      );
  }

  public getToken () {
    return this.httpClient.get(`${this.ENDPOINT}/token`)
      .pipe<string>(
        map<any, string>(({ data }) => data)
      );
  }

  public getApiKey () {
    return this.httpClient.get(`${this.ENDPOINT}/apikey`)
      .pipe<string>(
        map<any, string>(({ data }) => data)
      );
  }

  public getProfile () {
    return this.httpClient.get(`${this.ENDPOINT}/profile`)
      .pipe<UserProfile>(
        map<any, UserProfile>(({ data }) => new UserProfile(data))
      );
  }

  public getAuthentications () {
    return this.httpClient.get(`${this.ENDPOINT}/authentications`)
      .pipe<UserAuth[]>(
        map<any, UserAuth[]>(({ data }) => data.map(auth => new UserAuth(auth)))
      );
  }

  public getNotifications () {
    return this.httpClient.get(`${this.ENDPOINT}/notifications`)
      .pipe<any[]>(
        map<any, any[]>(({ data }) => data)
      );
  }

  public updateEmail (newEmail, password) {
    return this.httpClient.patch(`${this.ENDPOINT}/email`, { newEmail, password })
      .pipe<string>(
        map<any, string>(({ data }) => data)
      );
  }

  public updatePassword (newPassword, password) {
    return this.httpClient.patch(`${this.ENDPOINT}/password`, { newPassword, password })
      .pipe<boolean>(
        map<any, boolean>(({ data }) => data)
      );
  }

  public uploadAvatar (avatar) {
    return this.httpClient.patch(`${this.ENDPOINT}/avatar`, { avatar })
      .pipe<string>(
        map<any, string>(({ data }) => data)
      );
  }

  public updateProfile (profile) {
    return this.httpClient.patch(`${this.ENDPOINT}/profile`, { profile })
      .pipe<UserProfile>(
        map<any, UserProfile>(({ data }) => new UserProfile(data))
      );
  }

  public updateApiKey (password) {
    return this.httpClient.patch(`${this.ENDPOINT}/apikey`, { password })
      .pipe<string>(
        map<any, string>(({ data }) => data)
      );
  }

}
