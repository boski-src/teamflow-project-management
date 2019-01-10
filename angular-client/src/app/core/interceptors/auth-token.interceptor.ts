import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import { LocalStorageService } from '../services';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor (private router : Router, private localStorageService : LocalStorageService) {}

  public intercept (req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    const token : string = this.localStorageService.token;

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }

}