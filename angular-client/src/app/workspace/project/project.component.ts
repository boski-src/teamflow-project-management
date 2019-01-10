import { Types } from 'mongoose';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { StoreService } from '../../core/services';
import { Project, Team } from '../../core/models';
import { PROJECT_UPDATED, PROJECT_UPDATED_SUBSCRIPTION } from '../../core/graphql';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

  private workspaceSubscription : Subscription = new Subscription();
  private projectSubscription : Subscription = new Subscription();
  private projectUpdatedSubscription : Subscription = new Subscription();

  constructor (
    private route : ActivatedRoute,
    private apollo : Apollo,
    private storeService : StoreService
  ) { }

  public get project () : Project {
    return this.storeService.project;
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public subscribeToProjectUpdated (workspaceId : Types.ObjectId, projectId : Types.ObjectId) : void {
    this.projectUpdatedSubscription = this.apollo.subscribe({
      query: PROJECT_UPDATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const updated = data[PROJECT_UPDATED];
        this.storeService.patchProject(updated.id, updated);
      });
  }

  public ngOnInit () {
    this.route.params.subscribe((params : Params) => {
      this.ngOnDestroy();
      this.workspaceSubscription = this.storeService.workspace$
        .subscribe((workspace : Team) => {
          if (workspace.id) this.storeService.fetchProject(workspace.id, params.projectId);
        });
      this.projectSubscription = this.storeService.project$
        .subscribe((project : Project) => {
          if (project.id) this.subscribeToProjectUpdated(this.workspace.id, project.id);
        });
    });
  }

  public ngOnDestroy () {
    this.workspaceSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
    this.projectUpdatedSubscription.unsubscribe();
    this.storeService.resetProject();
  }

}
