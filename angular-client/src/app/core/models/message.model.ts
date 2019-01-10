import { Injectable } from '@angular/core';
import { Types } from 'mongoose';

import { ISerializer } from './serializer.interface';

import { User } from './user/user.model';

@Injectable()
export class Message implements ISerializer {

  public id : Types.ObjectId;
  public invoker : User;
  public body : string;
  public date : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<Message> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      id: this.id,
      invoker: this.invoker,
      body: this.body,
      date: this.date
    };
  }

}
