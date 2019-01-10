import { ISerializer } from '../serializer.interface';

export class UserProfile implements ISerializer {

  public fullName : string;
  public about : string;
  public title : string;
  public community : { url : string, platform : string }[];

  constructor (data : any) {
    this.deserialize(data);
  }

  public deserialize<UserProfile> (data) {
    Object.assign(<any>this, data);
    return this;
  }

  public serialize () {
    return {
      fullName: this.fullName,
      about: this.about,
      title: this.title,
      community: this.community
    };
  }

}