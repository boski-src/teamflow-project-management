import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../core/services';
import { Team, Project, Chat } from '../../core/models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor (private storeService : StoreService) { }

  public get workspaces () : Team[] {
    return this.storeService.workspaces;
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get projects () : Project[] {
    return this.storeService.projects;
  }

  public get project () : Project {
    return this.storeService.project;
  }

  public get chats () : Chat[] {
    return this.storeService.chats;
  }

  public get chat () : Chat {
    return this.storeService.chat;
  }

  public get roles () : Chat {
    return this.storeService.roles;
  }

  public ngOnInit () {
    this.storeService.fetchAllWorkspaces();
  }

}
