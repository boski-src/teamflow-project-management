import { map } from 'rxjs/operators';
import { Types } from 'mongoose';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITeamRepositoryService } from './team-repository.service.interface';
import { Team, TeamRoles, User } from '../../models';
import { AccountService } from '../../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class TeamRepositoryService implements ITeamRepositoryService {

  private ENDPOINT = '/teams';
  private ENDPOINT_TEAM = (teamId : Types.ObjectId) => `/teams/${teamId}`;

  constructor (private httpClient : HttpClient, private accountService : AccountService) { }

  public get account () {
    return this.accountService.get();
  }

  public create (data) {
    return this.httpClient.post(this.ENDPOINT, data)
      .pipe<Team>(
        map<any, Team>(({ data }) => {
          data.leader = new User(this.account.serialize());
          return new Team(data);
        })
      );
  }

  public getAll () {
    return this.httpClient.get(this.ENDPOINT)
      .pipe<Team[]>(
        map<any, Team[]>(({ data }) => data.map(team => new Team(team)))
      );
  }

  public getAllPaging (start, limit) {
    return this.httpClient.get(this.ENDPOINT, { params: { start, limit } })
      .pipe<Team[]>(
        map<any, Team[]>(({ data }) => data.map(team => new Team(team)))
      );
  }

  public get (teamId) {
    return this.httpClient.get(this.ENDPOINT_TEAM(teamId))
      .pipe<Team>(
        map<any, Team>(({ data }) => {
          data.leader = new User(data.leader);
          return new Team(data);
        })
      );
  }

  public getRoles (teamId) {
    return this.httpClient.get(`${this.ENDPOINT_TEAM(teamId)}/access`)
      .pipe<TeamRoles>(
        map<any, TeamRoles>(({ data }) => new TeamRoles(data))
      );
  }

  public getAdmins (teamId) {
    return this.httpClient.get(`${this.ENDPOINT_TEAM(teamId)}/admins`)
      .pipe<User[]>(
        map<any, User[]>(({ data }) => data.map(user => new User(user)))
      );
  }

  public getAdminsPaging (teamId, start, limit) {
    return this.httpClient.get(`${this.ENDPOINT_TEAM(teamId)}/admins`, { params: { start, limit } })
      .pipe<User[]>(
        map<any, User[]>(({ data }) => data.map(user => new User(user)))
      );
  }

  public getMembers (teamId) {
    return this.httpClient.get(`${this.ENDPOINT_TEAM(teamId)}/members`)
      .pipe<User[]>(
        map<any, User[]>(({ data }) => data.map(user => new User(user)))
      );
  }

  public getMembersPaging (teamId, start, limit) {
    return this.httpClient.get(`${this.ENDPOINT_TEAM(teamId)}/members`, { params: { start, limit } })
      .pipe<User[]>(
        map<any, User[]>(({ data }) => data.map(user => new User(user)))
      );
  }

  public update (teamId, data) {
    return this.httpClient.put(this.ENDPOINT_TEAM(teamId), data)
      .pipe<Team>(
        map<any, Team>(({ data }) => new Team(data))
      );
  }

  public updateName (teamId, name) {
    return this.httpClient.patch(`${this.ENDPOINT_TEAM(teamId)}/name`, { name })
      .pipe<Team>(
        map<any, Team>(({ data }) => new Team(data))
      );
  }

  public updateDesc (teamId, description) {
    return this.httpClient.patch(`${this.ENDPOINT_TEAM(teamId)}/description`, { description })
      .pipe<Team>(
        map<any, Team>(({ data }) => new Team(data))
      );
  }

  public updateAdmins (teamId, admins) {
    return this.httpClient.patch(`${this.ENDPOINT_TEAM(teamId)}/admins`, { admins })
      .pipe<Team>(
        map<any, Team>(({ data }) => new Team(data))
      );
  }

  public updateMembers (teamId, members) {
    return this.httpClient.patch(`${this.ENDPOINT_TEAM(teamId)}/members`, { members })
      .pipe<Team>(
        map<any, Team>(({ data }) => new Team(data))
      );
  }

  public leaveFromAdmin (teamId) {
    return this.httpClient.patch(`${this.ENDPOINT_TEAM(teamId)}/admins/self`, {})
      .pipe<Team>(
        map<any, Team>(({ data }) => new Team(data))
      );
  }

  public leaveFromMember (teamId) {
    return this.httpClient.patch(`${this.ENDPOINT_TEAM(teamId)}/members/self`, {})
      .pipe<Team>(
        map<any, Team>(({ data }) => new Team(data))
      );
  }

  public delete (teamId, password) {
    return this.httpClient.request('delete', this.ENDPOINT_TEAM(teamId), { body: { password } })
      .pipe<Team>(
        map<any, Team>(({ data }) => new Team(data))
      );
  }

}
