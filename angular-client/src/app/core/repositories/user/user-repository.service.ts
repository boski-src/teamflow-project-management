import { map } from 'rxjs/operators';
import { Types } from 'mongoose';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUserRepositoryService } from './user-repository.service.interface';
import { User, UserProfile } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService implements IUserRepositoryService {

  private ENDPOINT = `/users`;
  private ENDPOINT_USER = (userId : Types.ObjectId) => `/users/${userId}`;

  constructor (private httpClient : HttpClient) { }

  public get (userId) {
    return this.httpClient.get(this.ENDPOINT_USER(userId))
      .pipe<User>(
        map<any, User>(({ data }) => {
          data.profile = new UserProfile(data.profile);
          return new User(data);
        })
      );
  }

  public getByName (name : string, limit : string = '20') {
    return this.httpClient.get(`${this.ENDPOINT}/search`, { params: { name, limit } })
      .pipe<User[]>(
        map<any, User[]>(({ data }) => data.map(user => new User(user)))
      );
  }

}
