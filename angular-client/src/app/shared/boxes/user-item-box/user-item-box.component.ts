import { Types } from 'mongoose';
import { Component, Input } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { User, UserProfile } from '../../../core/models';

@Component({
  selector: 'app-user-item-box',
  templateUrl: './user-item-box.component.html'
})
export class UserItemBoxComponent {

  @Input() public user : User;
  @Input() public size : number = 35;
  @Input() public status : boolean = true;
  @Input() public naming : boolean = true;

  constructor () { }

  public get id () : Types.ObjectId {
    return this.user.id;
  }

  public get realName () : string {
    return this.user.name || `${this.user.firstName} ${this.user.lastName}`;
  }

  public get profile () : UserProfile {
    return this.user.profile;
  }

  public get isOnline () : boolean {
    return this.user.online;
  }

  public get avatar () {
    return `${environment.storageUrl}/avatars/${this.user.id}`;
  }

}
