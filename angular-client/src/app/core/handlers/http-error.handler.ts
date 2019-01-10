import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { SessionService } from '../services';

@Injectable()
export class HttpErrorHandler implements ErrorHandler {

  constructor (private injector : Injector) {}

  public handleError (error : Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) this.catchHttp(error);
    if (!environment.production) console.error(error);
  }

  private catchHttp (error : HttpErrorResponse) : void {
    const sessionervice = this.injector.get(SessionService);
    if (error.status === 401) sessionervice.destroy();
  }

}