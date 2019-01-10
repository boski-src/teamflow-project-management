import { ISerializer } from '../serializer.interface';

export class UserAuth implements ISerializer {

  public from : string;
  public date : Date;

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<UserAccount> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      form: this.from,
      date: this.date
    };
  }

}