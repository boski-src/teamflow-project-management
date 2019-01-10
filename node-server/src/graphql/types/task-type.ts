import { Types } from "mongoose";
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { userRepository } from '../../base/repositories';
import { UserType } from './user-type';
import { MessageType } from './message-type';

export const TaskType = new GraphQLObjectType({
  name: 'TaskType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve (root, args, { fieldASTs }) {
        if (Types.ObjectId.isValid(root.author)) {
          return await userRepository.findById(root.author, fieldASTs);
        }
        return root.author;
      }
    },
    state: { type: GraphQLInt },
    priority: { type: GraphQLInt },
    due: { type: GraphQLDateTime },
    notes: { type: GraphQLList(MessageType) },
    deleted: { type: GraphQLBoolean },
    // trasher: { type: UserType },
    deletedAt: { type: GraphQLDateTime },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime }
  },
});