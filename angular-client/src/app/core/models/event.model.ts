import { Types } from 'mongoose';
import { Injectable } from '@angular/core';
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';

import { ISerializer } from './serializer.interface';

import { User } from './user/user.model';
import { Note } from './note.model';

@Injectable()
export class Event implements ISerializer {

  public id : Types.ObjectId;
  public name : string;
  public description : string;
  public author : User;
  public colors : { primary : string, secondary : string };
  public start : Date;
  public end : Date;
  public notes : Note[];
  public updatedAt : Date;
  public createdAt : Date;
  public deletedAt : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<Event> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      start: this.start,
      end: this.end,
      colors: this.colors,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }

  public serializeForCalendar (actions? : CalendarEventAction[]) : CalendarEvent<this> {
    return {
      title: this.name,
      color: this.colors,
      start: new Date(this.start),
      end: new Date(this.end),
      draggable: false,
      allDay: true,
      meta: this,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      actions
    };
  }

}
