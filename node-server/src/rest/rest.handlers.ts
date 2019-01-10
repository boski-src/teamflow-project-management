import { INext, IRequest, IResponse } from 'express-server-decorators';

import { rest } from './rest';

export class RESTHandlers {

  public serverError (err : any, req : IRequest, res : IResponse, next : INext) : void {
    rest.jsonResponse({ status: err.status, error: err.message })(res);
  }

}

export const restHandlers = new RESTHandlers();
export const { serverError } = restHandlers;