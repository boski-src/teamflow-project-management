import { Types } from 'mongoose';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Team, User } from '../../core/models';
import { TeamRepositoryService, UserRepositoryService } from '../../core/repositories';
import { StoreService, TitleService } from '../../core/services';
import { TEAM_USERS_UPDATED_SUBSCRIPTION, TEAM_UPDATED } from '../../core/graphql';

@Component({
  selector: 'app-workspace-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

  public users : User[] = [];
  public cached_users : User[] = [];

  public admins : User[] = [];
  public remove_admins : Types.ObjectId[] = [];
  public add_admins : Types.ObjectId[] = [];
  public search_admins : string = '';

  public members : User[] = [];
  public remove_members : Types.ObjectId[] = [];
  public add_members : Types.ObjectId[] = [];
  public search_members : string = '';

  private usersUpdatedSubscription : Subscription = new Subscription();

  constructor (
    private formBuilder : FormBuilder,
    private teamRepository : TeamRepositoryService,
    private userRepository : UserRepositoryService,
    private storeService : StoreService,
    private apollo : Apollo
  ) { }

  public get pages () : string[] {
    return [this.workspace.name, 'Users'];
  }

  public get roles () : string {
    return this.storeService.roles;
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public searchControl : FormControl = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  public onSearch () : void {
    if (this.searchControl.valid && this.searchControl.value.trim().length) {
      this.userRepository.getByName(this.searchControl.value, '20')
        .subscribe(data => {
          this.users = data.map(user => {
            user.email = user.email.replace(/facebook:/g, '');
            return user;
          });
          this.cached_users = [...data, ...this.cached_users];
        });
    }
  }

  public user (array : User[], userId : Types.ObjectId) : User {
    return array.find(user => user.id === userId);
  }

  public inArray (array : Types.ObjectId[], userId : Types.ObjectId, key : string = null) : boolean {
    if (key) return array.findIndex(x => x[key] === userId) >= 0;
    return array.findIndex(x => x === userId) >= 0;
  }

  public pushOrSpliceUser (array : Types.ObjectId[], userId : Types.ObjectId) : void {
    let index = array.findIndex(x => x === userId);
    if (index >= 0) array.splice(index, 1);
    else array.push(userId);
  }

  public loadUsers (workspaceId : Types.ObjectId) : void {
    this.loadAdmins(workspaceId);
    this.loadMembers(workspaceId);
  }

  public loadAdmins (workspaceId : Types.ObjectId = null) : void {
    this.remove_admins = [];
    this.add_admins = [];
    this.search_admins = '';
    this.teamRepository.getAdmins(workspaceId || this.workspace.id)
      .subscribe(data => {
        this.admins = data.map(user => {
          user.email = user.email.replace(/facebook:/g, '');
          return user;
        });
      });
  }

  public loadMembers (workspaceId : Types.ObjectId = null) : void {
    this.remove_members = [];
    this.add_members = [];
    this.search_members = '';
    this.teamRepository.getMembers(workspaceId || this.workspace.id)
      .subscribe(data => {
        this.members = data.map(user => {
          user.email = user.email.replace(/facebook:/g, '');
          return user;
        });
      });
  }

  public submitAdmins () : void {
    if (this.admins.length - this.remove_admins.length > 0) {
      this.teamRepository.updateAdmins(this.workspace.id, this.remove_admins)
        .subscribe(() => {
          // this.loadAdmins();
        });
    }
  }

  public submitMembers () : void {
    this.teamRepository.updateMembers(this.workspace.id, this.remove_members)
      .subscribe(() => {
        // this.loadMembers();
      });
  }

  public submitInvitations () : void {
    let changed = false;
    if (this.add_admins.length) {
      this.teamRepository.updateAdmins(this.workspace.id, this.add_admins)
        .subscribe(() => {
          this.add_admins = [];
          // this.loadAdmins();
          changed = true;
        });
    }
    if (this.add_members.length) {
      this.teamRepository.updateMembers(this.workspace.id, this.add_members)
        .subscribe(() => {
          this.add_members = [];
          // this.loadMembers();
          changed = true;
        });
    }
    if (changed) {
      this.searchControl.setValue('');
      this.users = [];
    }
  }

  public subscribeToWorkspaceUsersUpdated (workspaceId : Types.ObjectId) {
    this.usersUpdatedSubscription = this.apollo.subscribe({
      query: TEAM_USERS_UPDATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId
      }
    })
      .subscribe(({ data }) => {
        let updated = data[TEAM_UPDATED];
        this.admins = updated.admins;
        this.members = updated.members;
      });
  }

  public ngOnInit () {
    this.storeService.workspace$
      .subscribe((workspace : Team) => {
        this.ngOnDestroy();
        if (workspace.id) {
          this.loadUsers(workspace.id);
          this.subscribeToWorkspaceUsersUpdated(workspace.id);
        }
      });
  }

  public ngOnDestroy () {
    this.usersUpdatedSubscription.unsubscribe();
  }

}
