import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_NAME = 'access_token';

  public get () : string {
    return localStorage.getItem(this.TOKEN_NAME) || '';
  }

  public set (token : string) : void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  public remove () : void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

}
