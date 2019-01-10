import { GraphQLID, GraphQLNonNull } from 'graphql';
import {
  Arguments,
  Resolver,
  ScalarType,
  Subscription,
  withFilter
} from 'graphql-express-server-decorators';

import { hasTeamAccess, isAuth } from '../../graphql.guards';
import { checkProjectExists, checkTeamExists, checkTaskExists } from '../../graphql.middlewares';

import { client } from '../../pubsub';
import { TASK_CREATED, TASK_DELETED, TASK_NOTE_CREATED, TASK_UPDATED } from '../../constants';
import { MessageType, TaskType } from '../../types';

@Resolver([isAuth, checkTeamExists, checkProjectExists, hasTeamAccess])
export class TaskResolver {

  @Subscription()
  @ScalarType(TaskType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) }
  })
  public taskCreated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[TASK_CREATED]._project.toString() === args.projectId;
    return withFilter(() => client.asyncIterator(TASK_CREATED), filter)(root, args, ctx);
  }

  @Subscription([checkTaskExists])
  @ScalarType(MessageType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) },
    taskId: { type: GraphQLNonNull(GraphQLID) }
  })
  public taskNoteCreated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[TASK_NOTE_CREATED]._task.toString() === args.taskId;
    return withFilter(() => client.asyncIterator(TASK_NOTE_CREATED), filter)(root, args, ctx);
  }

  @Subscription()
  @ScalarType(TaskType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) }
  })
  public taskDeleted (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[TASK_DELETED]._project.toString() === args.projectId;
    return withFilter(() => client.asyncIterator(TASK_DELETED), filter)(root, args, ctx);
  }

  @Subscription()
  @ScalarType(TaskType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) }
  })
  public taskUpdated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[TASK_UPDATED]._project.toString() === args.projectId;
    return withFilter(() => client.asyncIterator(TASK_UPDATED), filter)(root, args, ctx);
  }

}