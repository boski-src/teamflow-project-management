import { Injectable } from '@angular/core';
import { Types } from 'mongoose';

import { ISerializer } from '../serializer.interface';

import { UserProfile } from './user-profile.model';
import { UserAuth } from './user-auth.model';

@Injectable()
export class User implements ISerializer {

  public id : Types.ObjectId;
  public firstName : string;
  public lastName : string;
  public email : string;
  public online : boolean;
  public apiKey : string;
  public profile : UserProfile;
  public authentications : UserAuth[];
  public updatedAt : Date;
  public createdAt : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public get name () : string {
    return `${this.firstName} ${this.lastName}`;
  }

  public deserialize<User> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      online: this.online,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt
    };
  }

}