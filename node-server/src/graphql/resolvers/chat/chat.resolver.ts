import { GraphQLID, GraphQLNonNull } from 'graphql';
import {
  Arguments,
  Resolver,
  ScalarType,
  Subscription,
  withFilter
} from 'graphql-express-server-decorators';

import { hasTeamAccess, isAuth } from '../../graphql.guards';
import { checkChatExists, checkTeamExists } from '../../graphql.middlewares';

import { client } from '../../pubsub';
import { CHAT_CREATED, CHAT_DELETED, CHAT_MESSAGE_CREATED, CHAT_UPDATED } from '../../constants';
import { ChatMessageType, ChatType } from '../../types';

@Resolver([isAuth, checkTeamExists, hasTeamAccess])
export class ChatResolver {

  @Subscription()
  @ScalarType(ChatType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) }
  })
  public chatCreated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[CHAT_CREATED]._team.toString() === args.teamId;
    return withFilter(() => client.asyncIterator(CHAT_CREATED), filter)(root, args, ctx);
  }

  @Subscription()
  @ScalarType(ChatType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) }
  })
  public chatDeleted (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[CHAT_DELETED]._team.toString() === args.teamId;
    return withFilter(() => client.asyncIterator(CHAT_DELETED), filter)(root, args, ctx);
  }

  @Subscription([checkChatExists])
  @ScalarType(ChatMessageType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    chatId: { type: GraphQLNonNull(GraphQLID) }
  })
  public chatMessageCreated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[CHAT_MESSAGE_CREATED]._chat.toString() === args.chatId;
    return withFilter(() => client.asyncIterator(CHAT_MESSAGE_CREATED), filter)(root, args, ctx);
  }

  @Subscription([checkChatExists])
  @ScalarType(ChatType)
  @Arguments({
    teamId: { type: GraphQLNonNull(GraphQLID) },
    chatId: { type: GraphQLNonNull(GraphQLID) }
  })
  public chatUpdated (root, args, ctx) : AsyncIterator<any> {
    const filter = (payload, args) => payload[CHAT_UPDATED].id.toString() === args.chatId;
    return withFilter(() => client.asyncIterator(CHAT_UPDATED), filter)(root, args, ctx);
  }

}