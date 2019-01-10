import { Types } from 'mongoose';
import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { userRepository } from '../../base/repositories';
import { UserType } from './user-type';

export const ChatMessageType = new GraphQLObjectType({
  name: 'ChatMessageType',
  fields: {
    id: { type: GraphQLID },
    invoker: {
      type: UserType,
      async resolve (root : any, args, { fieldASTs }) {
        if (Types.ObjectId.isValid(root.invoker)) {
          return await userRepository.findById(root.invoker, fieldASTs);
        }
        return root.invoker;
      }
    },
    body: { type: GraphQLString },
    updatedAt: { type: GraphQLDateTime },
    createdAt: { type: GraphQLDateTime }
  },
});