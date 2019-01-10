import { Types } from "mongoose";
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { userRepository } from '../../base/repositories';
import { UserType } from './user-type';
import { MessageType } from './message-type';

const EventColorType = new GraphQLObjectType({
  name: 'EventColorType',
  fields: {
    primary: { type: GraphQLString },
    secondary: { type: GraphQLString }
  }
});

export const EventType = new GraphQLObjectType({
  name: 'EventType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    colors: { type: EventColorType },
    author: {
      type: UserType,
      async resolve (root, args, { fieldASTs }) {
        if (Types.ObjectId.isValid(root.author)) {
          return await userRepository.findById(root.author, fieldASTs);
        }
        return root.author;
      }
    },
    start: { type: GraphQLDateTime },
    end: { type: GraphQLDateTime },
    notes: { type: GraphQLList(MessageType) },
    deleted: { type: GraphQLBoolean },
    // trasher: { type: UserType },
    deletedAt: { type: GraphQLDateTime },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime }
  },
});