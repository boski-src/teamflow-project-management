import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor (private router : Router, private sessionService : SessionService) {}

  canLoad (
    next : Route,
    state : UrlSegment[]
  ) : Observable<boolean> | Promise<boolean> | boolean {
    if (!this.sessionService.logged) {
      this.router.navigate(['auth', 'signin']);
      return false;
    }
    return true;
  }

}
