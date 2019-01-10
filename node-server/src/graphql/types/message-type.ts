import { Types } from "mongoose";
import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { userRepository } from '../../base/repositories';
import { UserType } from './user-type';

export const MessageType = new GraphQLObjectType({
  name: 'MessageType',
  fields: {
    id: {
      type: GraphQLID,
      resolve (root) {
        return root._id.toString();
      }
    },
    invoker: {
      type: UserType,
      async resolve (root, args, { fieldASTs }) {
        if (Types.ObjectId.isValid(root.invoker)) {
          return await userRepository.findById(root.invoker, fieldASTs);
        }
        return root.invoker;
      }
    },
    body: { type: GraphQLString },
    date: { type: GraphQLDateTime }
  },
});