import { IConfig } from 'express-server-decorators';

import { decodeBearer } from './rest.middlewares';
import { serverError } from './rest.handlers';

import {
  AccountController,
  AuthController,
  ProjectEventController,
  ProjectTaskController,
  RecoveryController,
  StorageController,
  TeamChatController,
  TeamController,
  TeamProjectController,
  UserController
} from './controllers';

export const RESTConfig : IConfig = {
  middlewares: [
    decodeBearer
  ],
  guards: [],
  handlers: [
    serverError
  ],
  controllers: [
    StorageController,
    AuthController,
    AccountController,
    RecoveryController,
    UserController,
    TeamController,
    TeamChatController,
    TeamProjectController,
    ProjectTaskController,
    ProjectEventController
  ]
};