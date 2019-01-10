import { Injectable } from '@angular/core';

import { ISerializer } from './serializer.interface';

@Injectable()
export class Error implements ISerializer {

  public status : number;
  public code : string | number;
  public data : string;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      status: this.status,
      code: this.code,
      data: this.data
    };
  }

}
