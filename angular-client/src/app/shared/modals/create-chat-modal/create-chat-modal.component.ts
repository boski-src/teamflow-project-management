import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Chat, Team } from '../../../core/models';

@Component({
  selector: 'app-create-chat-modal',
  templateUrl: './create-chat-modal.component.html'
})
export class CreateChatModalComponent {

  @Input() public workspace : Team = this.storeService.workspace;

  constructor (
    private router : Router,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
  ) { }

  public onCreated (data : Chat) {
    this.toastrService.success('Chat has been created.');
    // this.storeService.chats.push(data);
    this.activeModal.close();
    this.router.navigate(['/', this.workspace.id, 'chat', data.id]);
  }

  public onError (error : any) {
    this.toastrService.warning('Error while creating new chat, try again.');
  }

}
