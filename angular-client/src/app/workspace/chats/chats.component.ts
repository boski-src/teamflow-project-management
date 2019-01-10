import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService, TitleService } from '../../core/services';
import { Chat, Team } from '../../core/models';
import { CreateChatModalComponent, EditChatModalComponent } from '../../shared/modals';
import { ChatRepositoryService } from '../../core/repositories';

@Component({
  selector: 'app-workspace-projects',
  templateUrl: './chats.component.html'
})
export class ChatsComponent {

  public search : string = '';
  public loading : boolean = false;

  constructor (
    private modal : NgbModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
    private chatRepository : ChatRepositoryService
  ) { }

  public get pages () : string[] {
    return [this.workspace.name, 'Chats'];
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get roles () : any {
    return this.storeService.roles;
  }

  public get chats () : Chat[] {
    return this.storeService.chats;
  }

  public refreshChats () : void {
    this.loading = true;
    this.storeService.fetchAllChats(this.storeService.workspace.id);
    setTimeout(() => this.loading = false, 2000);
  }

  public openEditChatModal (chat : Chat) : void {
    const modal = this.modal.open(EditChatModalComponent, { size: 'lg' });
    modal.componentInstance.chat = chat;
  }

  public openCreateChatModal () : void {
    this.modal.open(CreateChatModalComponent, { size: 'lg' });
  }

  public deleteChat (chat : Chat) : void {
    this.chatRepository.delete(this.workspace.id, chat.id)
      .subscribe(
        () => {
          this.toastrService.success('Chat has been removed.');
          this.refreshChats();
        },
        () => this.toastrService.warning('Error while deleting, chat didn\'t removed.')
      );
  }

}
