import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StoreService } from '../../core/services';
import { Chat, Project, Team } from '../../core/models';
import { CreateProjectModalComponent, CreateChatModalComponent } from '../../shared/modals';

@Component({
  selector: 'app-workspace-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {

  public detailsCollapsed : boolean = true;
  public projectsCollapsed : boolean = false;
  public chatsCollapsed : boolean = false;

  constructor (
    private modal : NgbModal,
    private storeService : StoreService
  ) { }

  public get pages () : string[] {
    return [this.workspace.name, 'Overview'];
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get projects () : Project[] {
    return this.storeService.projects;
  }

  public get chats () : Chat[] {
    return this.storeService.chats;
  }

  public get roles () : any {
    return this.storeService.roles;
  }

  public openCreateProjectModal () : void {
    this.modal.open(CreateProjectModalComponent, { size: 'lg' });
  }

  public openCreateChatModal () : void {
    this.modal.open(CreateChatModalComponent, { size: 'lg' });
  }

}
