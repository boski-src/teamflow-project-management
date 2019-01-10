import { Component, Input } from '@angular/core';

import { ChatMessage, User } from '../../../core/models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-message-item-box',
  templateUrl: './message-item-box.component.html'
})
export class MessageItemBoxComponent {

  @Input() public message : ChatMessage;
  @Input() public me : boolean = false;

  constructor () { }

  public get invoker () : User {
    return this.message.invoker;
  }

  public get invokerName () : string {
    return `${this.invoker.firstName} ${this.invoker.lastName}`;
  }

  public get avatar () : string {
    return `${environment.storageUrl}/avatars/${this.message.invoker.id}`;
  }

}
