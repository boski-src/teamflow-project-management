import { map } from 'rxjs/operators';
import { Types } from 'mongoose';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITaskRepositoryService } from './task-repository.service.interface';
import { Message, Task, User } from '../../models';
import { AccountService } from '../../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryService implements ITaskRepositoryService {

  private ENDPOINT (teamId : Types.ObjectId, projectId : Types.ObjectId) {
    return `/teams/${teamId}/projects/${projectId}/tasks`;
  }

  private ENDPOINT_TASK (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId
  ) {
    return `/teams/${teamId}/projects/${projectId}/tasks/${taskId}`;
  }

  private ENDPOINT_NOTE (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId,
    noteId : Types.ObjectId
  ) {
    return `/teams/${teamId}/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
  }

  constructor (private httpClient : HttpClient, private accountService : AccountService) { }

  public get account () {
    return this.accountService.get();
  }

  public create (teamId, projectId, data) {
    return this.httpClient.post(this.ENDPOINT(teamId, projectId), data)
      .pipe<Task>(
        map<any, Task>(({ data }) => {
          data.author = new User(this.account.serialize());
          return new Task(data);
        })
      );
  }

  public createNote (teamId, projectId, taskId, body) {
    return this.httpClient.post(`${this.ENDPOINT_TASK(teamId, projectId, taskId)}/notes`, { body })
      .pipe<Message>(
        map<any, Message>(({ data }) => {
          data.invoker = new User(this.account.serialize());
          return new Message(data);
        })
      );
  }

  public getAll (teamId, projectId) {
    return this.httpClient.get(this.ENDPOINT(teamId, projectId))
      .pipe<Task[]>(
        map<any, Task[]>(({ data }) => data.map(task => new Task(task)))
      );
  }

  public get (teamId, projectId, taskId) {
    return this.httpClient.get(this.ENDPOINT_TASK(teamId, projectId, taskId))
      .pipe<Task>(
        map<any, Task>(({ data }) => {
          data.author = new User(data.author);
          return new Task(data);
        })
      );
  }

  public getNotes (teamId, projectId, taskId) {
    return this.httpClient.get(`${this.ENDPOINT_TASK(teamId, projectId, taskId)}/notes`)
      .pipe<Message[]>(
        map<any, Message[]>(({ data }) => data.map(note => {
          note.invoker = new User(note.invoker);
          return new Message(note);
        }))
      );
  }

  public update (teamId, projectId, taskId, data) {
    return this.httpClient.put(this.ENDPOINT_TASK(teamId, projectId, taskId), data)
      .pipe<Task>(
        map<any, Task>(({ data }) => new Task(data))
      );
  }

  public delete (teamId, projectId, taskId) {
    return this.httpClient.delete(this.ENDPOINT_TASK(teamId, projectId, taskId))
      .pipe<Task>(
        map<any, Task>(({ data }) => new Task(data))
      );
  }

  public deleteNote (teamId, projectId, taskId, noteId) {
    return this.httpClient.delete(this.ENDPOINT_NOTE(teamId, projectId, taskId, noteId))
      .pipe<Task>(
        map<any, Task>(({ data }) => new Task(data))
      );
  }

}
