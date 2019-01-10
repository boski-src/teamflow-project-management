import { Injectable } from '@angular/core';
import { Types } from 'mongoose';

import { ISerializer } from '../serializer.interface';

import { User } from '../user/user.model';
import { Message } from '../message.model';

@Injectable()
export class Chat implements ISerializer {

  public id : Types.ObjectId;
  public name : string;
  public description : string;
  public manager : User;
  public messages : Message[];
  public updatedAt : Date;
  public createdAt : Date;
  public deletedAt : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<Chat> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }

}
