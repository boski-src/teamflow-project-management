import { Injectable } from '@angular/core';
import { Types } from 'mongoose';

import { ISerializer } from './serializer.interface';

import { User } from './user/user.model';
import { Note } from './note.model';

@Injectable()
export class Task implements ISerializer {

  public id : Types.ObjectId;
  public name : string;
  public description : string;
  public author : User;
  public state : number;
  public priority : number;
  public notes : Note[];
  public due : Date;
  public updatedAt : Date;
  public createdAt : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<Task> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      state: this.state,
      priority: this.priority,
      due: this.due,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }

}
