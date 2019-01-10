import { Injectable } from '@angular/core';
import { Types } from 'mongoose';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private TOKEN = 'access_token';
  private STAR_TEAMS = 'fav_teams';

  constructor () { }

  /* Token */

  public get token () : string {
    return localStorage.getItem(this.TOKEN) || '';
  }

  public set token (token : string) {
    localStorage.setItem(this.TOKEN, token);
  }

  public removeToken () : void {
    localStorage.removeItem(this.TOKEN);
  }

  /* Favorite Teams */

  public get teams () : Types.ObjectId[] {
    return JSON.parse(localStorage.getItem(this.STAR_TEAMS)) || [];
  }

  public set teams (array : Types.ObjectId[]) {
    localStorage.setItem(this.STAR_TEAMS, JSON.stringify(array));
  }

  public pushToTeams (id : Types.ObjectId) {
    if (!this.teams.find(x => x === id)) {
      this.teams = [...this.teams, id];
    }
  }

  public spliceTeams (array : Types.ObjectId[]) {
    let current : any = this.teams;
    current = current.filter((value) => array.find(x => x !== value));

    this.teams = current;
  }

  public removeTeams () : void {
    localStorage.removeItem(this.STAR_TEAMS);
  }

}