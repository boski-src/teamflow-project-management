import { Apollo } from 'apollo-angular';
import { Types } from 'mongoose';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';

import { StoreService } from '../core/services';
import { Chat, Project, Team } from '../core/models';
import {
  CHAT_CREATED,
  CHAT_CREATED_SUBSCRIPTION,
  CHAT_DELETED,
  CHAT_DELETED_SUBSCRIPTION,
  PROJECT_CREATED,
  PROJECT_CREATED_SUBSCRIPTION,
  PROJECT_DELETED,
  PROJECT_DELETED_SUBSCRIPTION,
  TEAM_DELETED,
  TEAM_DELETED_SUBSCRIPTION,
  TEAM_UPDATED,
  TEAM_UPDATED_SUBSCRIPTION
} from '../core/graphql';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  private workspaceUpdatedSubscription : Subscription = new Subscription();
  private workspaceDeletedSubscription : Subscription = new Subscription();
  private projectCreatedSubscription : Subscription = new Subscription();
  private projectDeletedSubscription : Subscription = new Subscription();
  private chatCreatedSubscription : Subscription = new Subscription();
  private chatDeletedSubscription : Subscription = new Subscription();

  @ViewChild('routerOutlet') public routerOutlet : RouterOutlet;

  constructor (
    private route : ActivatedRoute,
    private router : Router,
    private toastrService : ToastrService,
    private storeService : StoreService,
    private apollo : Apollo
  ) { }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get project () : Project {
    return this.storeService.project;
  }

  public get chat () : Chat {
    return this.storeService.chat;
  }

  public get roles () : any {
    return this.storeService.roles;
  }

  public subscribeToWorkspaceUpdated (workspaceId : Types.ObjectId) : void {
    this.workspaceUpdatedSubscription = this.apollo.subscribe({
      query: TEAM_UPDATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId
      }
    })
      .subscribe(({ data }) => {
        const updated = data[TEAM_UPDATED];
        this.storeService.patchWorkspace(updated.id, updated);
      });
  }

  public subscribeToWorkspaceDeleted (workspaceId : Types.ObjectId) : void {
    this.workspaceDeletedSubscription = this.apollo.subscribe({
      query: TEAM_DELETED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId
      }
    })
      .subscribe(({ data }) => {
        const deleted = data[TEAM_DELETED];
        this.toastrService.error(`Workspace "${deleted.name}" has been removed.`);
        this.router.navigate(['/']);
        this.storeService.spliceWorkspace(deleted.id);
      });
  }

  public subscribeToProjectCreated (workspaceId : Types.ObjectId) : void {
    this.projectCreatedSubscription = this.apollo.subscribe({
      query: PROJECT_CREATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId
      }
    })
      .subscribe(({ data }) => {
        const created = data[PROJECT_CREATED];
        this.storeService.projects.push(created);
      });
  }

  public subscribeToProjectDeleted (workspaceId : Types.ObjectId) : void {
    this.projectDeletedSubscription = this.apollo.subscribe({
      query: PROJECT_DELETED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId
      }
    })
      .subscribe(({ data }) => {
        const deleted = data[PROJECT_DELETED];

        if (this.project.id === deleted.id) {
          this.toastrService.error(`Project "${deleted.name}" has been removed.`);
          this.router.navigate(['/', this.workspace.id, 'projects']);
        }

        this.storeService.spliceProject(deleted.id);
      });
  }

  public subscribeToChatCreated (workspaceId : Types.ObjectId) : void {
    this.chatCreatedSubscription = this.apollo.subscribe({
      query: CHAT_CREATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId
      }
    })
      .subscribe(({ data }) => {
        const created = data[CHAT_CREATED];
        this.storeService.chats.push(created);
      });
  }

  public subscribeToChatDeleted (workspaceId : Types.ObjectId) : void {
    this.chatDeletedSubscription = this.apollo.subscribe({
      query: CHAT_DELETED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId
      }
    })
      .subscribe(({ data }) => {
        const deleted = data[CHAT_DELETED];

        if (this.chat.id === deleted.id) {
          this.toastrService.error(`Chat "${deleted.name}" has been removed.`);
          this.router.navigate(['/', this.workspace.id, 'chats']);
        }

        this.storeService.spliceChat(deleted.id);
      });
  }

  public ngOnInit () {
    this.route.params.subscribe((params : Params) => {
      this.ngOnDestroy();
      this.storeService.fetchWorkspace(params.workspaceId);
      this.storeService.fetchAllProjects(params.workspaceId);
      this.storeService.fetchAllChats(params.workspaceId);

      this.subscribeToWorkspaceUpdated(params.workspaceId);
      this.subscribeToWorkspaceDeleted(params.workspaceId);
      this.subscribeToProjectCreated(params.workspaceId);
      this.subscribeToProjectDeleted(params.workspaceId);
      this.subscribeToChatCreated(params.workspaceId);
      this.subscribeToChatDeleted(params.workspaceId);
    });
  }

  public ngOnDestroy () {
    this.workspaceUpdatedSubscription.unsubscribe();
    this.workspaceDeletedSubscription.unsubscribe();
    this.projectCreatedSubscription.unsubscribe();
    this.projectDeletedSubscription.unsubscribe();
    this.chatCreatedSubscription.unsubscribe();
    this.chatDeletedSubscription.unsubscribe();

    this.storeService.resetWorkspace();
    this.storeService.resetChats();
    this.storeService.resetProjects();
  }

}
