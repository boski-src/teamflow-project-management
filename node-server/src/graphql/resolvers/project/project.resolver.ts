import { GraphQLID, GraphQLNonNull } from 'graphql';
import {
  Arguments,
  Resolver,
  ScalarType,
  Subscription,
  withFilter
} from 'graphql-express-server-decorators';

import { hasTeamAccess, isAuth } from '../../graphql.guards';
import { checkProjectExists, checkTeamExists } from '../../graphql.middlewares';

import { client } from '../../pubsub';
import { PROJECT_CREATED, PROJECT_DELETED, PROJECT_UPDATED } from '../../constants';
import { ProjectType } from '../../types';

@Resolver([isAuth, checkTeamExists, hasTeamAccess])
export class ProjectResolver {

  @Subscription()
  @ScalarType(ProjectType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) }
  })
  public projectCreated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[PROJECT_CREATED]._team.toString() === args.teamId;
    return withFilter(() => client.asyncIterator(PROJECT_CREATED), filter)(root, args, ctx);
  }

  @Subscription()
  @ScalarType(ProjectType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) }
  })
  public projectDeleted (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[PROJECT_DELETED]._team.toString() === args.teamId;
    return withFilter(() => client.asyncIterator(PROJECT_DELETED), filter)(root, args, ctx);
  }

  @Subscription([checkProjectExists])
  @ScalarType(ProjectType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) }
  })
  public projectUpdated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[PROJECT_UPDATED].id.toString() === args.projectId;
    return withFilter(() => client.asyncIterator(PROJECT_UPDATED), filter)(root, args, ctx);
  }
}