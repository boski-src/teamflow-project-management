import { map } from 'rxjs/operators';
import { Types } from 'mongoose';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IEventRepositoryService } from './event-repository.service.interface';
import { Chat, Event, Message, User } from '../../models';
import { AccountService } from '../../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class EventRepositoryService implements IEventRepositoryService {

  private ENDPOINT (teamId : Types.ObjectId, projectId : Types.ObjectId) {
    return `/teams/${teamId}/projects/${projectId}/events`;
  }

  private ENDPOINT_EVENT (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId
  ) {
    return `/teams/${teamId}/projects/${projectId}/events/${eventId}`;
  }

  private ENDPOINT_NOTE (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId,
    noteId : Types.ObjectId
  ) {
    return `/teams/${teamId}/projects/${projectId}/events/${eventId}/notes/${noteId}`;
  }

  constructor (private httpClient : HttpClient, private accountService : AccountService) { }

  public get account () {
    return this.accountService.get();
  }

  public create (teamId, projectId, data) {
    return this.httpClient.post(this.ENDPOINT(teamId, projectId), data)
      .pipe<Event>(
        map<any, Event>(({ data }) => {
          data.author = new User(this.account.serialize());
          return new Event(data);
        })
      );
  }

  public createNote (teamId, projectId, eventId, body) {
    return this.httpClient.post(`${this.ENDPOINT_EVENT(teamId, projectId, eventId)}/notes`, { body })
      .pipe<Message>(
        map<any, Message>(({ data }) => {
          data.author = new User(this.account.serialize());
          return new Message(data);
        })
      );
  }

  public getAll (teamId, projectId) {
    return this.httpClient.get(this.ENDPOINT(teamId, projectId))
      .pipe<Event[]>(
        map<any, Event[]>(({ data }) => data.map(event => new Event(event)))
      );
  }

  public get (teamId, projectId, eventId) {
    return this.httpClient.get(this.ENDPOINT_EVENT(teamId, projectId, eventId))
      .pipe<Event>(
        map<any, Event>(({ data }) => {
          data.author = new User(data.author);
          return new Event(data);
        })
      );
  }

  public getNotes (teamId, projectId, eventId) {
    return this.httpClient.get(`${this.ENDPOINT_EVENT(teamId, projectId, eventId)}/notes`)
      .pipe<Message[]>(
        map<any, Message[]>(({ data }) => data.map(note => {
          note.invoker = new User(note.invoker);
          return new Message(note);
        }))
      );
  }

  public update (teamId, projectId, eventId, data) {
    return this.httpClient.put(this.ENDPOINT_EVENT(teamId, projectId, eventId), data)
      .pipe<Event>(
        map<any, Event>(({ data }) => new Event(data))
      );
  }

  public delete (teamId, projectId, eventId) {
    return this.httpClient.delete(this.ENDPOINT_EVENT(teamId, projectId, eventId))
      .pipe<Event>(
        map<any, Event>(({ data }) => new Event(data))
      );
  }

  public deleteNote (teamId, projectId, eventId, noteId) {
    return this.httpClient.delete(this.ENDPOINT_NOTE(teamId, projectId, eventId, noteId))
      .pipe<Event>(
        map<any, Event>(({ data }) => new Event(data))
      );
  }

}
