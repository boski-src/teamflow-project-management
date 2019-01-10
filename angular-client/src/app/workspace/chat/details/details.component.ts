import { Component } from '@angular/core';

import { StoreService } from '../../../core/services';
import { Chat, Team } from '../../../core/models';

@Component({
  selector: 'app-chat-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  public detailsCollapsed : boolean = false;

  constructor (private storeService : StoreService) { }

  public get pages () : string[] {
    return [this.workspace.name, 'Chat', this.chat.name];
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get chat () : Chat {
    return this.storeService.chat;
  }

  public get roles () : any {
    return this.storeService.roles;
  }

}
