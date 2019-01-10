import { Subscription } from 'rxjs';
import { Types } from 'mongoose';
import { Apollo } from 'apollo-angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateTaskModalComponent, EditTaskModalComponent, ViewTaskModalComponent } from '../../../shared/modals';

import { AccountService, StoreService } from '../../../core/services';
import { Project, Task, Team, UserAccount, User } from '../../../core/models';
import { TaskRepositoryService } from '../../../core/repositories';
import {
  TASK_CREATED,
  TASK_UPDATED,
  TASK_CREATED_SUBSCRIPTION,
  TASK_UPDATED_SUBSCRIPTION, TASK_DELETED, TASK_DELETED_SUBSCRIPTION
} from '../../../core/graphql';

interface IListItem {
  name : string;
  color : string;
  state : number;
  tasks : Task[];
}

type Boards = IListItem[];

@Component({
  selector: 'app-project-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnDestroy {

  public tasks : Task[] = [];
  private projectSubscription : Subscription = new Subscription();
  private taskCreatedSubscription : Subscription = new Subscription();
  private taskUpdatedSubscription : Subscription = new Subscription();
  private taskDeletedSubscription : Subscription = new Subscription();

  public lists : Boards = [
    {
      name: 'Todo',
      color: 'secondary',
      state: 1,
      tasks: []
    },
    {
      name: 'Approved',
      color: 'primary',
      state: 2,
      tasks: []
    },
    {
      name: 'In Progress',
      color: 'warning',
      state: 3,
      tasks: []
    },
    {
      name: 'Testing',
      color: 'dark',
      state: 4,
      tasks: []
    },
    {
      name: 'Done',
      color: 'success',
      state: 5,
      tasks: []
    }
  ];

  constructor (
    private modal : NgbModal,
    private accountService : AccountService,
    private storeService : StoreService,
    private apollo : Apollo,
    private taskRepository : TaskRepositoryService
  ) { }

  public get pages () : string[] {
    return [this.workspace.name, 'Project', this.project.name, 'Tasks'];
  }

  public get account () : UserAccount {
    return this.accountService.get();
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get project () : Project {
    return this.storeService.project;
  }

  public get roles () : any {
    return this.storeService.roles;
  }

  public openCreateTaskModal () : void {
    this.modal.open(CreateTaskModalComponent, { size: 'lg' }).result.then((result) => {
      if (result instanceof Task) {
        result.author = new User(this.account.serialize());
        this.tasks.push(result);
        this.filterTasks();
      }
    }, (reason) => false);
  }

  public openEditTaskModal (task : Task) : void {
    this.taskRepository.get(this.workspace.id, this.project.id, task.id)
      .subscribe(data => {
        const modal = this.modal.open(EditTaskModalComponent, { size: 'lg' });
        modal.componentInstance.task = data;
      });
  }

  public openViewTaskModal (task : Task) : void {
    this.taskRepository.get(this.workspace.id, this.project.id, task.id)
      .subscribe(data => {
        const modal = this.modal.open(ViewTaskModalComponent, { size: 'lg' });
        modal.componentInstance.task = data;
      });
  }

  public subscribeToTaskCreated (workspaceId : Types.ObjectId, projectId : Types.ObjectId) : void {
    this.taskCreatedSubscription = this.apollo.subscribe({
      query: TASK_CREATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const created = data[TASK_CREATED];
        if (created.author.id !== this.account.id) {
          this.tasks.push(created);
          this.filterTasks();
        }
      });
  }

  public subscribeToTaskUpdated (workspaceId : Types.ObjectId, projectId : Types.ObjectId) : void {
    this.taskUpdatedSubscription = this.apollo.subscribe({
      query: TASK_UPDATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const updated = data[TASK_UPDATED];
        let taskIndex = this.tasks.findIndex(task => task.id === updated.id);
        if (taskIndex > -1) {
          this.tasks[taskIndex] = updated;
          this.filterTasks();
        }
      });
  }

  public subscribeToTaskDeleted (workspaceId : Types.ObjectId, projectId : Types.ObjectId) : void {
    this.taskDeletedSubscription = this.apollo.subscribe({
      query: TASK_DELETED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const deleted = data[TASK_DELETED];
        let taskIndex = this.tasks.findIndex(task => task.id === deleted.id);
        if (taskIndex > -1) {
          this.tasks.splice(taskIndex, 1);
          this.filterTasks();
        }
      });
  }

  public filterTasks () : void {
    this.lists.forEach((list : IListItem) => {
      list.tasks = this.tasks.filter((value : Task) => value.state === list.state);
    });
  }

  public deleteTask (task : Task) : void {
    this.taskRepository.delete(this.workspace.id, this.project.id, task.id)
      .subscribe(data => {
        // let index = this.tasks.findIndex(task => task.id === data.id);
        // this.tasks.splice(index, 1);
        // this.filterTasks();
      });
  }

  public loadTasks (workspaceId, projectId) : void {
    this.taskRepository.getAll(workspaceId, projectId)
      .subscribe(data => {
        this.tasks = data;
        this.filterTasks();
      });
  }

  public drop (list : IListItem, event : CdkDragDrop<string[]>) {
    const item : Task = event.item.data;

    if (event.previousContainer !== event.container) {
      item.state = list.state;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.taskRepository.update(this.workspace.id, this.project.id, item.id, item)
        .subscribe(() => false, () => {
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        });
    }
  }

  public ngOnInit () {
    this.ngOnDestroy();
    this.projectSubscription = this.storeService.project$
      .subscribe((project : Project) => {
        if (project.id) {
          this.loadTasks(this.workspace.id, project.id);
          this.subscribeToTaskCreated(this.workspace.id, project.id);
          this.subscribeToTaskUpdated(this.workspace.id, project.id);
          this.subscribeToTaskDeleted(this.workspace.id, project.id);
        }
      });
  }

  public ngOnDestroy () {
    this.projectSubscription.unsubscribe();
    this.taskCreatedSubscription.unsubscribe();
    this.taskUpdatedSubscription.unsubscribe();
    this.taskDeletedSubscription.unsubscribe();
  }

}
