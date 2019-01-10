import * as passport from 'passport';
import { ExpressApp, INext, IRequest, IResponse } from 'express-server-decorators';

import { configLoader, logger, passportInit } from '../base';
import { RESTConfig } from './rest.config';

export class REST extends ExpressApp {

  public configure () : void {
    this.defaultConfig();
    passportInit();

    this.app.use(passport.initialize());
    this.app.enable('trust proxy');

    if (process.env.HTTP_LIMITER || configLoader.get('environment.limiter')) {
      const redisClient = require('redis').createClient({
        host: configLoader.get('database.redis.hostname'),
        port: configLoader.get('database.redis.port'),
        password: configLoader.get('database.redis.password')
      });
      const limiter = require('express-limiter')(this.app, redisClient);

      limiter({
        path: '*',
        method: 'all',
        total: 1000,
        expire: 1000000,
        lookup (req : IRequest, res : IResponse, opts : any, next : INext) {
          if (req.apikey) {
            if (req.headers.Authorization) opts.lookup = 'headers.Authorization';
            if (req.query.access_token) opts.lookup = 'query.access_token';
            if (req.body.access_token) opts.lookup = 'body.access_token';
          } else {
            opts.lookup = 'connection.remoteAddress';
          }

          return next();
        },
        onRateLimited (req, res, next) {
          next({
            message: 'Rate limit exceeded.',
            status: 429
          });
        }
      });
    }
  }

}

export const rest = new REST(RESTConfig, '', (e : any) => {
  if (e.message !== 'Validation error.') logger.errors.error(e);
});