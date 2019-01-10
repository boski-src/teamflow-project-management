import { GraphQLID, GraphQLNonNull } from 'graphql';
import {
  Arguments,
  Resolver,
  ScalarType,
  Subscription,
  withFilter
} from 'graphql-express-server-decorators';

import { hasTeamAccess, isAuth } from '../../graphql.guards';
import { checkTeamExists } from '../../graphql.middlewares';

import { client } from '../../pubsub';
import { TEAM_DELETED, TEAM_UPDATED } from '../../constants';
import { TeamType } from '../../types';

@Resolver([isAuth, checkTeamExists, hasTeamAccess])
export class TeamResolver {

  @Subscription()
  @ScalarType(TeamType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) }
  })
  public teamUpdated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[TEAM_UPDATED].id.toString() === args.teamId;
    return withFilter(() => client.asyncIterator(TEAM_UPDATED), filter)(root, args, ctx);
  }

  @Subscription()
  @ScalarType(TeamType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) }
  })
  public teamDeleted (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[TEAM_DELETED].id.toString() === args.teamId;
    return withFilter(() => client.asyncIterator(TEAM_DELETED), filter)(root, args, ctx);
  }

}