import { Types } from 'mongoose';
import { INext, IRequest, IResponse } from 'express-server-decorators';

import {
  chatRepository,
  eventRepository,
  passportAuthenticate,
  projectRepository,
  taskRepository,
  teamRepository,
  userRepository
} from '../base';

export class RESTMiddlewares {

  public async decodeBearer (req : IRequest, res : IResponse, next : INext) {
    let { user, apiKey } : any = await passportAuthenticate('bearer')(req, res, next);
    if (user) {
      req.account = user;
      req.apikey = apiKey;
    }
    next();
  }

  public async checkUserExists (req : IRequest, res : IResponse, next : INext, userId : Types.ObjectId) {
    try {
      req.user = await userRepository.findById(userId);
      if (!req.user)
        return next({
          message: 'User not found in any document.',
          status: 404
        });
      next();
    }
    catch (e) {
      next({ message: 'User ID parameter is invalid.', status: 400 });
    }
  }

  public async checkTeamExists (req : IRequest, res : IResponse, next : INext, teamId : Types.ObjectId) {
    try {
      req.team = await teamRepository.findById(teamId);
      if (!req.team)
        return next({
          message: 'Team not found in any document.',
          status: 404
        });
      next();
    }
    catch (e) {
      next({ message: 'Team ID parameter is invalid.', status: 400 });
    }
  }

  public async checkChatExists (req : IRequest, res : IResponse, next : INext, chatId : Types.ObjectId) {
    try {
      req.chat = await chatRepository.findOne({ _id: chatId, _team: req.params.teamId });
      if (!req.chat)
        return next({
          message: 'Chat not found in any document.',
          status: 404
        });
      next();
    }
    catch (e) {
      next({ message: 'Chat ID parameter is invalid.', status: 400 });
    }
  }

  public async checkProjectExists (req : IRequest, res : IResponse, next : INext, projectId : Types.ObjectId) {
    try {
      req.project = await projectRepository.findOne({ _id: projectId, _team: req.params.teamId });
      if (!req.project)
        return next({
          message: 'Project not found in any document.',
          status: 404
        });
      next();
    }
    catch (e) {
      next({ message: 'Project ID parameter is invalid.', status: 400 });
    }
  }

  public async checkTaskExists (req : IRequest, res : IResponse, next : INext, taskId : Types.ObjectId) {
    try {
      req.task = await taskRepository.findOne({ _id: taskId, _project: req.params.projectId });
      if (!req.task)
        return next({
          message: 'Task not found in any document.',
          status: 404
        });
      next();
    }
    catch (e) {
      next({ message: 'Task ID parameter is invalid.', status: 400 });
    }
  }

  public async checkEventExists (req : IRequest, res : IResponse, next : INext, eventId : Types.ObjectId) {
    try {
      req.event = await eventRepository.findOne({ _id: eventId, _project: req.params.projectId });
      if (!req.event)
        return next({
          message: 'Event not found in any document.',
          status: 404
        });
      next();
    }
    catch (e) {
      next({ message: 'Event ID parameter is invalid.', status: 400 });
    }
  }

}

export const restMiddlewares = new RESTMiddlewares();
export const {
  decodeBearer,
  checkUserExists,
  checkTeamExists,
  checkChatExists,
  checkProjectExists,
  checkTaskExists,
  checkEventExists
} = restMiddlewares;