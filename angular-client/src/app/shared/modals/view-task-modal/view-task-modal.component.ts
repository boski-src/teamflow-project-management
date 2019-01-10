import { Types } from 'mongoose';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { User, Message, Project, Task, Team, UserAccount } from '../../../core/models';
import { AccountService, StoreService } from '../../../core/services';
import { TaskRepositoryService } from '../../../core/repositories';
import { TASK_NOTE_CREATED, TASK_NOTE_CREATED_SUBSCRIPTION, TASK_UPDATED, TASK_UPDATED_SUBSCRIPTION } from '../../../core/graphql';

@Component({
  selector: 'app-view-task-modal',
  templateUrl: './view-task-modal.component.html'
})
export class ViewTaskModalComponent implements OnInit, AfterViewChecked, OnDestroy {

  @Input() public workspace : Team = this.storeService.workspace;
  @Input() public project : Project = this.storeService.project;
  @Input() public task : Task = new Task({});
  @ViewChild('commentsBox') public commentsBox : ElementRef;

  public notes : Message[];
  public descriptionCollapsed : boolean = true;
  private taskNoteCreatedSubscription : Subscription = new Subscription();
  private taskUpdatedSubscription : Subscription = new Subscription();

  constructor (
    public formBuilder : FormBuilder,
    public activeModal : NgbActiveModal,
    private accountService : AccountService,
    private toastrService : ToastrService,
    private storeService : StoreService,
    private taskRepository : TaskRepositoryService,
    private apollo : Apollo
  ) { }

  private commentControl : FormControl = this.formBuilder.control('', [
    Validators.required,
    Validators.maxLength(256)
  ]);

  public get valid () {
    return this.commentControl.valid && this.commentControl.value.trim().length > 0;
  }

  public get account () : UserAccount {
    return this.accountService.get();
  }

  public sendComment () : void {
    if (this.valid) {
      this.taskRepository.createNote(
        this.workspace.id,
        this.project.id,
        this.task.id,
        this.commentControl.value
      )
        .subscribe(data => {
          this.commentControl.reset();
          this.notes.push(data);
          this.scrollBottom();
        });
    }
  }

  public scrollBottom () : void {
    this.commentsBox.nativeElement.scrollTop = this.commentsBox.nativeElement.scrollHeight;
  }

  public subscribeToTaskNoteCreated (
    workspaceId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId
  ) : void {
    this.taskNoteCreatedSubscription = this.apollo.subscribe({
      query: TASK_NOTE_CREATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId,
        taskId
      }
    })
      .subscribe(({ data }) => {
        const created = data[TASK_NOTE_CREATED];
        if (created.invoker.id !== this.account.id) {
          created.invoker = new User(created.invoker);
          this.notes.push(created);
        }
      });
  }

  public subscribeToTaskUpdated (
    workspaceId : Types.ObjectId,
    projectId : Types.ObjectId
  ) : void {
    this.taskUpdatedSubscription = this.apollo.subscribe({
      query: TASK_UPDATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const updated = data[TASK_UPDATED];
        if (this.task.id === updated.id) this.task = new Task(updated);
      });
  }

  public ngOnInit () {
    this.taskRepository.getNotes(this.workspace.id, this.project.id, this.task.id)
      .subscribe(data => {
        this.notes = data
        this.scrollBottom();
        this.subscribeToTaskUpdated(this.workspace.id, this.project.id);
        this.subscribeToTaskNoteCreated(this.workspace.id, this.project.id, this.task.id);
      });
  }

  public ngAfterViewChecked () {
    this.scrollBottom();
  }

  public ngOnDestroy () {
    this.taskNoteCreatedSubscription.unsubscribe();
    this.taskUpdatedSubscription.unsubscribe();
  }

}
