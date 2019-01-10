import { Types } from 'mongoose';

import { ISerializer } from '../serializer.interface';

export class UserAccount implements ISerializer {

  public id : Types.ObjectId;
  public firstName : string;
  public lastName : string;
  public email : string;
  public online : boolean;
  public updatedAt : Date;
  public createdAt : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public get name () : string {
    return `${this.firstName} ${this.lastName}`;
  }

  public deserialize<UserAccount> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      online: true,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }

}