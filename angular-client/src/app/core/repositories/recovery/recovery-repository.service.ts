import { map } from 'rxjs/operators';
import { Types } from 'mongoose';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IRecoveryRepositoryService } from './recovery-repository.service.interface';

@Injectable({
  providedIn: 'root'
})
export class RecoveryRepositoryService implements IRecoveryRepositoryService {

  private ENDPOINT = `/recovery`;
  private ENDPOINT_EMAIL = (email : string) => `/recovery/${email}`;
  private ENDPOINT_TOKEN = (userId : Types.ObjectId, token : string) => `/recovery/${userId}/${token}`;

  constructor (private httpClient : HttpClient) { }

  public sendMail (email) {
    return this.httpClient.get(this.ENDPOINT_EMAIL(email))
      .pipe<boolean>(
        map<any, boolean>(({ data }) => data)
      );
  }

  public validToken (userId, token) {
    return this.httpClient.get(this.ENDPOINT_TOKEN(userId, token))
      .pipe<string>(
        map<any, string>(({ data }) => data)
      );
  }

  public updatePassword (userId, token, newPassword) {
    return this.httpClient.post(this.ENDPOINT_TOKEN(userId, token), { newPassword })
      .pipe<boolean>(
        map<any, boolean>(({ data }) => data)
      );
  }

}

