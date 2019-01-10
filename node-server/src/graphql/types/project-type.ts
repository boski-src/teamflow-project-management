import { Types } from "mongoose";
import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { userRepository } from '../../base/repositories';
import { UserType } from './user-type';

export const ProjectType = new GraphQLObjectType({
  name: 'ProjectType',
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
    deadline: { type: GraphQLDateTime },
    finished: { type: GraphQLBoolean },
    deleted: { type: GraphQLBoolean },
    // trasher: { type: UserType },
    deletedAt: { type: GraphQLDateTime },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime }
  },
});