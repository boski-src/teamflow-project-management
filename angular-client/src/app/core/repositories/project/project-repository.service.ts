import { map } from 'rxjs/operators';
import { Types } from 'mongoose';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IProjectRepositoryService } from './project-repository.service.interface';
import { Event, Project, Task, User } from '../../models';
import { AccountService } from '../../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectRepositoryService implements IProjectRepositoryService {

  private ENDPOINT = (teamId : Types.ObjectId) => `/teams/${teamId}/projects`;
  private ENDPOINT_PROJECT = (teamId : Types.ObjectId, projectId : Types.ObjectId) => `/teams/${teamId}/projects/${projectId}`;

  constructor (private httpClient : HttpClient, private accountService : AccountService) { }

  public get account () {
    return this.accountService.get();
  }

  public create (teamId, data) {
    return this.httpClient.post(this.ENDPOINT(teamId), data)
      .pipe<Project>(
        map<any, Project>(({ data }) => {
          data.manager = new User(data.manager);
          return new Project(data);
        })
      );
  }

  public getAll (teamId) {
    return this.httpClient.get(this.ENDPOINT(teamId))
      .pipe<Project[]>(
        map<any, Project[]>(({ data }) => data.map(project => new Project(project)))
      );
  }

  public getAllPaging (teamId, start, limit) {
    return this.httpClient.get(this.ENDPOINT(teamId), { params: { start, limit } })
      .pipe<Project[]>(
        map<any, Project[]>(({ data }) => data.map(project => new Project(project)))
      );
  }

  public get (teamId, projectId) {
    return this.httpClient.get(this.ENDPOINT_PROJECT(teamId, projectId))
      .pipe<Project>(
        map<any, Project>(({ data }) => {
          data.manager = new User(data.manager);
          return new Project(data);
        })
      );
  }

  public getTasks (teamId, projectId) {
    return this.httpClient.get(`${this.ENDPOINT_PROJECT(teamId, projectId)}/tasks`)
      .pipe<Task[]>(
        map<any, Task[]>(({ data }) => data.map(task => {
          task.author = new User(task.author);
          return new Task(task);
        }))
      );
  }

  public getEvents (teamId, projectId) {
    return this.httpClient.get(`${this.ENDPOINT_PROJECT(teamId, projectId)}/events`)
      .pipe<Event[]>(
        map<any, Event[]>(({ data }) => data.map(event => {
          event.author = new User(event.author);
          return new Event(event);
        }))
      );
  }

  public update (teamId, projectId, data) {
    return this.httpClient.put(this.ENDPOINT_PROJECT(teamId, projectId), data)
      .pipe<Project>(
        map<any, Project>(({ data }) => new Project(data))
      );
  }

  public updateName (teamId, projectId, name) {
    return this.httpClient.patch(this.ENDPOINT_PROJECT(teamId, projectId), { name })
      .pipe<Project>(
        map<any, Project>(({ data }) => new Project(data))
      );
  }

  public updateDesc (teamId, projectId, description) {
    return this.httpClient.patch(this.ENDPOINT_PROJECT(teamId, projectId), { description })
      .pipe<Project>(
        map<any, Project>(({ data }) => new Project(data))
      );
  }

  public updateDeadline (teamId, projectId, deadline) {
    return this.httpClient.patch(this.ENDPOINT_PROJECT(teamId, projectId), { deadline })
      .pipe<Project>(
        map<any, Project>(({ data }) => new Project(data))
      );
  }

  public updateFinished (teamId, projectId, finished) {
    return this.httpClient.patch(this.ENDPOINT_PROJECT(teamId, projectId), { finished })
      .pipe<Project>(
        map<any, Project>(({ data }) => new Project(data))
      );
  }

  public delete (teamId, projectId) {
    return this.httpClient.delete(this.ENDPOINT_PROJECT(teamId, projectId))
      .pipe<Project>(
        map<any, Project>(({ data }) => new Project(data))
      );
  }

}
