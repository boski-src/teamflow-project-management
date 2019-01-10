import { Types } from "mongoose";
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { userRepository } from '../../base/repositories';
import { UserType } from './user-type';
import { ChatMessageType } from './chat-message-type';

export const ChatType = new GraphQLObjectType({
  name: 'ChatType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    manager: {
      type: UserType,
      async resolve (root, args, { fieldASTs }) {
        if (Types.ObjectId.isValid(root.manager)) {
          return await userRepository.findById(root.manager, fieldASTs);
        }
        return root.manager;
      }
    },
    messages: { type: GraphQLList(ChatMessageType) },
    deleted: { type: GraphQLBoolean },
    // trasher: { type: UserType },
    deletedAt: { type: GraphQLDateTime },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime }
  },
});