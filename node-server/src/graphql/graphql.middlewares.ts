import {
  chatRepository,
  eventRepository,
  projectRepository,
  taskRepository,
  teamRepository,
  userRepository
} from '../base';

import { IChatModel, IEventModel, IProjectModel, ITaskModel, ITeamModel, IUserModel } from '../common';

export class GraphqlMiddlewares {

  public async checkUserExists (root, args) : Promise<IUserModel> {
    let user = await userRepository.findById(args.userId);
    if (!user) throw 'User not found in any document.';

    return user;
  }

  public async checkTeamExists (root, args) : Promise<ITeamModel> {
    try {
      let team = await teamRepository.findById(args.teamId);
      if (!team) throw 'Team not found in any document.';

      return team;
    }
    catch (e) {
      throw 'Team ID parameter is invalid.';
    }
  }

  public async checkChatExists (root, args) : Promise<IChatModel> {
    try {
      let chat = await chatRepository.findOne({ _id: args.chatId, _team: args.teamId });
      if (!chat) throw 'Chat not found in any document.';

      return chat;
    }
    catch (e) {
      throw 'Chat ID parameter is invalid.';
    }
  }

  public async checkProjectExists (root, args) : Promise<IProjectModel> {
    try {
      let project = await projectRepository.findOne({ _id: args.projectId, _team: args.teamId });
      if (!project) throw 'Project not found in any document.';

      return project;
    }
    catch (e) {
      throw 'Project ID parameter is invalid.';
    }
  }

  public async checkTaskExists (root, args) : Promise<ITaskModel> {
    try {
      let task = await taskRepository.findOne({ _id: args.taskId, _project: args.projectId });
      if (!task) throw 'Task not found in any document.';

      return task;
    }
    catch (e) {
      throw 'Task ID parameter is invalid.';
    }
  }

  public async checkEventExists (root, args) : Promise<IEventModel> {
    try {
      let event = await eventRepository.findOne({ _id: args.eventId, _project: args.projectId });
      if (!event) throw 'Event not found in any document.';

      return event;
    }
    catch (e) {
      throw 'Event ID parameter is invalid.';
    }
  }

}

export const graphqlMiddlewares = new GraphqlMiddlewares();

export const {
  checkUserExists,
  checkTeamExists,
  checkChatExists,
  checkProjectExists,
  checkTaskExists,
  checkEventExists
} = graphqlMiddlewares;