import { Injectable } from '@angular/core';
import { Types } from 'mongoose';

import { ISerializer } from './serializer.interface';

import { User } from './user/user.model';
import { Event } from './event.model';
import { Task } from './task.model';

@Injectable()
export class Project implements ISerializer {

  public id : Types.ObjectId;
  public name : string;
  public description : string;
  public manager : User;
  public events : Event[];
  public tasks : Task[];
  public deadline : Date;
  public finished : boolean;
  public updatedAt : Date;
  public createdAt : Date;
  public deletedAt : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<Project> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      deadline: this.deadline,
      finished: this.finished,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }

}
