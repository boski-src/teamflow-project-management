import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Chat, Team } from '../../../core/models';

@Component({
  selector: 'app-edit-chat-modal',
  templateUrl: './edit-chat-modal.component.html'
})
export class EditChatModalComponent {

  @Input() public workspace : Team = this.storeService.workspace;
  @Input() public chat : Chat = this.storeService.chat;

  constructor (
    private router : Router,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
  ) { }

  public onUpdated (data : Chat) {
    this.storeService.patchChat(data.id, data);
    this.toastrService.success('Chat has been updated.');
  }

  public onError (error : any) {
    this.toastrService.warning('Error while updating chat, try again.');
  }

}
