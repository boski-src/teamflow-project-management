import { Types } from 'mongoose';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { User, Message, Project, Team, UserAccount, Event } from '../../../core/models';
import { AccountService, StoreService } from '../../../core/services';
import { EventRepositoryService } from '../../../core/repositories';
import { EVENT_NOTE_CREATED, EVENT_NOTE_CREATED_SUBSCRIPTION, EVENT_UPDATED, EVENT_UPDATED_SUBSCRIPTION } from '../../../core/graphql';

@Component({
  selector: 'app-view-event-modal',
  templateUrl: './view-event-modal.component.html'
})
export class ViewEventModalComponent implements OnInit, AfterViewChecked, OnDestroy {

  @Input() public workspace : Team = this.storeService.workspace;
  @Input() public project : Project = this.storeService.project;
  @Input() public event : Event = new Event({});
  @ViewChild('commentsBox') public commentsBox : ElementRef;

  public notes : Message[];
  public descriptionCollapsed : boolean = true;
  private eventNoteCreatedSubscription : Subscription = new Subscription();
  private eventUpdatedSubscription : Subscription = new Subscription();

  constructor (
    public formBuilder : FormBuilder,
    public activeModal : NgbActiveModal,
    private accountService : AccountService,
    private toastrService : ToastrService,
    private storeService : StoreService,
    private eventRepository : EventRepositoryService,
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
      this.eventRepository.createNote(
        this.workspace.id,
        this.project.id,
        this.event.id,
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

  public subscribeToEventNoteCreated (
    workspaceId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId
  ) : void {
    this.eventNoteCreatedSubscription = this.apollo.subscribe({
      query: EVENT_NOTE_CREATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId,
        eventId
      }
    })
      .subscribe(({ data }) => {
        const created = data[EVENT_NOTE_CREATED];
        if (created.invoker.id !== this.account.id) {
          created.invoker = new User(created.invoker);
          this.notes.push(created);
        }
      });
  }

  public subscribeToEventUpdated (
    workspaceId : Types.ObjectId,
    projectId : Types.ObjectId
  ) : void {
    this.eventUpdatedSubscription = this.apollo.subscribe({
      query: EVENT_UPDATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const updated = data[EVENT_UPDATED];
        if (this.event.id === updated.id) this.event = new Event(updated);
      });
  }

  public ngOnInit () {
    this.eventRepository.getNotes(this.workspace.id, this.project.id, this.event.id)
      .subscribe(data => {
        this.notes = data;
        this.scrollBottom();
        this.subscribeToEventUpdated(this.workspace.id, this.project.id);
        this.subscribeToEventNoteCreated(this.workspace.id, this.project.id, this.event.id);
      });
  }

  public ngAfterViewChecked () {
    this.scrollBottom();
  }

  public ngOnDestroy () {
    this.eventNoteCreatedSubscription.unsubscribe();
    this.eventUpdatedSubscription.unsubscribe();
  }

}
