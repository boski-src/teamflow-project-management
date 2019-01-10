import { GraphQLID, GraphQLNonNull } from 'graphql';
import {
  Arguments,
  Resolver,
  ScalarType,
  Subscription,
  withFilter
} from 'graphql-express-server-decorators';

import { hasTeamAccess, isAuth } from '../../graphql.guards';
import { checkProjectExists, checkTeamExists, checkEventExists } from '../../graphql.middlewares';

import { client } from '../../pubsub';
import { EVENT_CREATED, EVENT_DELETED, EVENT_NOTE_CREATED, EVENT_UPDATED } from '../../constants';
import { EventType, MessageType } from '../../types';

@Resolver([isAuth, checkTeamExists, checkProjectExists, hasTeamAccess])
export class EventResolver {

  @Subscription()
  @ScalarType(EventType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) }
  })
  public eventCreated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[EVENT_CREATED]._project.toString() === args.projectId;
    return withFilter(() => client.asyncIterator(EVENT_CREATED), filter)(root, args, ctx);
  }

  @Subscription([checkEventExists])
  @ScalarType(MessageType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) },
    eventId: { type: GraphQLNonNull(GraphQLID) }
  })
  public eventNoteCreated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[EVENT_NOTE_CREATED]._event.toString() === args.eventId;
    return withFilter(() => client.asyncIterator(EVENT_NOTE_CREATED), filter)(root, args, ctx);
  }

  @Subscription()
  @ScalarType(EventType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) }
  })
  public eventDeleted (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[EVENT_DELETED]._project.toString() === args.projectId;

    return withFilter(() => client.asyncIterator(EVENT_DELETED), filter)(root, args, ctx);
  }

  @Subscription()
  @ScalarType(EventType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    projectId: { type: GraphQLNonNull(GraphQLID) }
  })
  public eventUpdated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[EVENT_UPDATED]._project.toString() === args.projectId;

    return withFilter(() => client.asyncIterator(EVENT_UPDATED), filter)(root, args, ctx);
  }

}