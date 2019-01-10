import * as passport from 'passport';
import { INext, IRequest, IResponse } from 'express-server-decorators';

import { IUserModel } from '../../../common/interfaces';

export function passportAuthenticate (strategyName : string) {
  return (req : IRequest, res : IResponse, next? : INext) : Promise<any> => {
    return new Promise(resolve => {
      passport.authenticate(strategyName, { session: false }, (err, user : IUserModel) => {
        if (err || !user) return resolve(false);
        return resolve(user);
      })(req, res, next || null);
    });
  };
}