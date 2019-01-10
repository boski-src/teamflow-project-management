import { Injectable } from '@angular/core';
import { Types } from 'mongoose';

import { ISerializer } from '../serializer.interface';

import { User } from '../user/user.model';
import { Project } from '../project.model';
import { Chat } from '../chat/chat.model';

@Injectable()
export class Team implements ISerializer {

  public id : Types.ObjectId;
  public name : string;
  public description : string;
  public leader : User;
  public admins : User[];
  public members : User[];
  public projects : Project[];
  public chats : Chat[];
  public updatedAt : Date;
  public createdAt : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<Team> (data) {
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
