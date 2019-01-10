import { Component, Input } from '@angular/core';

import { Chat, Team } from '../../../core/models';

@Component({
  selector: 'app-chat-item-box',
  templateUrl: './chat-item-box.component.html'
})
export class ChatItemBoxComponent {

  @Input() public workspace : Team;
  @Input() public chat : Chat;

  constructor () { }

}
