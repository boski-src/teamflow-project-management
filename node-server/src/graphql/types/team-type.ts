import { Types } from "mongoose";

import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { userRepository } from '../../base/repositories';
import { UserType } from './user-type';

export const TeamType = new GraphQLObjectType({
  name: 'TeamType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    leader: {
      type: UserType,
      async resolve (root, args, { fieldASTs }) {
        if (Types.ObjectId.isValid(root.manager)) {
          return await userRepository.findById(root.manager, fieldASTs);
        }
        return root.manager;
      }
    },
    admins: {
      type: GraphQLList(UserType),
      async resolve (root, args, { fieldASTs }) {
        return await userRepository.findByIds(root.admins, fieldASTs);
      }
    },
    members: {
      type: GraphQLList(UserType),
      async resolve (root, args, { fieldASTs }) {
        return await userRepository.findByIds(root.members, fieldASTs);
      }
    },
    deleted: { type: GraphQLBoolean },
    // trasher: { type: UserType },
    deletedAt: { type: GraphQLDateTime },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime }
  },
});