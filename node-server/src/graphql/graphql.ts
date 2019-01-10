import { INext, IRequest, IResponse } from 'express-server-decorators';
import { GraphQLServer } from 'graphql-express-server-decorators';

import { passportAuthenticate, userRepository } from '../base';
import { IUserModel } from '../common';

import { rest } from '../rest';
import { GraphQLConfig } from './graphql.config';

export class GraphQL extends GraphQLServer {

  public async onMiddleware (req : IRequest & any, res : IResponse, next : INext) : Promise<void | INext> {
    let query = req.query.query || req.body.query;
    if (query && query.length > 2000) throw new Error('Query too large.');

    if (!req.account) req.account = await GraphQL.decodeBearer(req.headers.authorization);

    req.graphctx = {
      account: req.account
    };

    next();
  }

  public async onConnect (connection : any) : Promise<object> {
    let account : IUserModel = await GraphQL.decodeBearer(connection.Authorization) || {} as IUserModel;

    if (account) {
      await userRepository.updateOnline(account.id, true);
      console.log('Connected:', account.email);
    }

    return { connection, account };
  }

  public async onDisconnect (_, socket) : Promise<void> {
    let { account } = await socket.initPromise;

    if (account) {
      await userRepository.updateOnline(account.id, false);
      console.log('Disconnected:', account.email);
    }
  }

  private static async decodeBearer (header) : Promise<IUserModel> {
    let auth : { apiKey : boolean, user : IUserModel } = await passportAuthenticate('bearer')({
      headers: {
        authorization: header
      }
    } as IRequest, {} as IResponse);

    return auth.user;
  }

}

export const graphql = new GraphQL(rest.app, rest.server, GraphQLConfig);