import { Types } from 'mongoose';
import { Injectable } from '@angular/core';

import { ISerializer } from '../serializer.interface';

import { User } from '../user/user.model';

@Injectable()
export class ChatMessage implements ISerializer {

  public id : Types.ObjectId;
  public invoker : User;
  public body : string;
  public createdAt : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<ChatMessage> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      id: this.id,
      invoker: this.invoker,
      body: this.body,
      createdAt: this.createdAt
    };
  }

}
