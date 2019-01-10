import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  public intercept (req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    req = req.clone({
      url: this.trimPath(environment.apiUrl) + req.url
    });

    return next.handle(req);
  }

  private trimPath (str : string) : string {
    return str[str.length - 1] === '/' ? str.slice(0, str.length - 1) : str;
  }

}
