import { Injectable } from '@angular/core';

import { ISerializer } from '../serializer.interface';

@Injectable()
export class TeamRoles implements ISerializer {

  public hasAccess : boolean;
  public isAdmin : boolean;
  public isMember : boolean;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      hasAccess: this.hasAccess,
      isAdmin: this.isAdmin,
      isMember: this.isMember
    };
  }

}
