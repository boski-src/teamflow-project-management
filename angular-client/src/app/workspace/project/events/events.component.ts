import { Subject, Subscription } from 'rxjs';
import { Types } from 'mongoose';
import { Apollo } from 'apollo-angular';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isSameDay, isSameMonth, } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';

import {
  CreateEventModalComponent,
  EditEventModalComponent,
  EditTaskModalComponent,
  ViewEventModalComponent,
  ViewTaskModalComponent
} from '../../../shared/modals';

import { AccountService, StoreService } from '../../../core/services';
import { Project, Team, UserAccount, Event, User } from '../../../core/models';
import { EventRepositoryService } from '../../../core/repositories';

import {
  EVENT_CREATED,
  EVENT_CREATED_SUBSCRIPTION,
  EVENT_DELETED,
  EVENT_DELETED_SUBSCRIPTION,
  EVENT_UPDATED,
  EVENT_UPDATED_SUBSCRIPTION
} from '../../../core/graphql';

@Component({
  selector: 'app-project-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit, OnDestroy {

  private projectSubscription : Subscription = new Subscription();
  private eventCreatedSubscription : Subscription = new Subscription();
  private eventUpdatedSubscription : Subscription = new Subscription();
  private eventDeletedSubscription : Subscription = new Subscription();

  @ViewChild('modalContent') public modalContent : TemplateRef<any>;
  public view : CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public viewDate : Date = new Date();
  public refresh : Subject<any> = new Subject<any>();
  public activeDayIsOpen : boolean = false;

  public events : CalendarEvent[] = [];
  public actions : CalendarEventAction[] = [
    {
      label: '<i class="fas fa-eye"></i>',
      onClick: ({ event } : { event : CalendarEvent }) : void => {
        this.openViewEventModal(event);
      }
    },
    {
      label: '<i class="fas fa-edit"></i>',
      onClick: ({ event } : { event : CalendarEvent }) : void => {
        this.openEditEventModal(event);
      }
    },
    {
      label: '<i class="fas fa-times"></i>',
      onClick: ({ event } : { event : CalendarEvent }) : void => {
        this.deleteEvent(event);
      }
    }
  ];

  constructor (
    private modal : NgbModal,
    private accountService : AccountService,
    private storeService : StoreService,
    private apollo : Apollo,
    private eventRepository : EventRepositoryService
  ) { }

  public get pages () : string[] {
    return [this.workspace.name, 'Project', this.project.name, 'Events'];
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

  public dayClicked ({ date, events } : { date : Date; events : CalendarEvent[] }) : void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0)
        this.activeDayIsOpen = false;
      else
        this.activeDayIsOpen = true;
    }
  }

  public openCreateEventModal () : void {
    this.modal.open(CreateEventModalComponent, { size: 'lg' }).result.then((result) => {
      if (result instanceof Event) {
        result.author = new User(this.account.serialize());
        this.events.push(result.serializeForCalendar(this.actions));
        this.refresh.next();
      }
    }, (reason) => false);
  }

  public openEditEventModal (event : CalendarEvent<Event>) : void {
    this.eventRepository.get(this.workspace.id, this.project.id, event.meta.id)
      .subscribe(data => {
        const modal = this.modal.open(EditEventModalComponent, { size: 'lg' });
        modal.componentInstance.event = data;
      });
  }

  public openViewEventModal (event : CalendarEvent<Event>) : void {
    this.eventRepository.get(this.workspace.id, this.project.id, event.meta.id)
      .subscribe(data => {
        const modal = this.modal.open(ViewEventModalComponent, { size: 'lg' });
        modal.componentInstance.event = data;
      });
  }

  public deleteEvent (event : CalendarEvent<Event>) : void {
    this.eventRepository.delete(this.workspace.id, this.project.id, event.meta.id)
      .subscribe(data => {
        // let index = this.events.findIndex(event => event.id === data.id);
        // if (index > -1) {
        //   this.events.splice(index, 1);
        //   this.refresh.next();
        // }
      });
  }

  public subscribeToEventCreated (workspaceId : Types.ObjectId, projectId : Types.ObjectId) : void {
    this.eventCreatedSubscription = this.apollo.subscribe({
      query: EVENT_CREATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const created = data[EVENT_CREATED];
        if (created.author.id !== this.account.id) {
          this.events.push(created);
          this.refresh.next();
        }
      });
  }

  public subscribeToEventUpdated (workspaceId : Types.ObjectId, projectId : Types.ObjectId) : void {
    this.eventUpdatedSubscription = this.apollo.subscribe({
      query: EVENT_UPDATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const updated = data[EVENT_UPDATED];
        let eventIndex = this.events.findIndex(event => event.meta.id === updated.id);
        if (eventIndex > -1) {
          this.events[eventIndex] = new Event(updated).serializeForCalendar(this.actions);
          this.refresh.next();
        }
      });
  }

  public subscribeToEventDeleted (workspaceId : Types.ObjectId, projectId : Types.ObjectId) : void {
    this.eventDeletedSubscription = this.apollo.subscribe({
      query: EVENT_DELETED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        projectId
      }
    })
      .subscribe(({ data }) => {
        const deleted = data[EVENT_DELETED];
        let eventIndex = this.events.findIndex(event => event.meta.id === deleted.id);
        if (eventIndex > -1) {
          this.events.splice(eventIndex, 1);
          this.refresh.next();
        }
      });
  }

  public loadEvents (workspaceId, projectId) : void {
    this.eventRepository.getAll(workspaceId, projectId)
      .subscribe(data => {
        this.events = data.map(data => new Event(data).serializeForCalendar(this.actions));
        this.refresh.next();
      });
  }

  public ngOnInit () {
    this.ngOnDestroy();
    this.projectSubscription = this.storeService.project$
      .subscribe((project : Project) => {
        if (project.id) {
          this.loadEvents(this.workspace.id, project.id);
          this.subscribeToEventCreated(this.workspace.id, project.id);
          this.subscribeToEventUpdated(this.workspace.id, project.id);
          this.subscribeToEventDeleted(this.workspace.id, project.id);
        }
      });
  }

  public ngOnDestroy () {
    this.projectSubscription.unsubscribe();
    this.eventCreatedSubscription.unsubscribe();
    this.eventUpdatedSubscription.unsubscribe();
    this.eventDeletedSubscription.unsubscribe();
  }

}
