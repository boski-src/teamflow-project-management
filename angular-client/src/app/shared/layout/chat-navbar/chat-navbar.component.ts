import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Chat, Team } from '../../../core/models';
import { EditChatModalComponent } from '../../modals';

@Component({
  selector: 'app-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.scss']
})
export class ChatNavbarComponent {

  @Input() public workspace : Team;
  @Input() public chat : Chat;
  @Input() public roles : any;

  constructor (private modal : NgbModal) { }

  public openEditChatModal () : void {
    this.modal.open(EditChatModalComponent, { size: 'lg' });
  }

}
