import { Document, Types } from 'mongoose';

import { IUserSchema } from '../user';
import { ITeamSchema } from '../team';

export interface IMessageSchema extends Document {
  _id : Types.ObjectId
  id : Types.ObjectId
  _chat : Types.ObjectId | ITeamSchema
  body : string
  invoker : Types.ObjectId | IUserSchema
  deleted : Boolean
  deletedAt : Date
  createdAt : Date
  updatedAt : Date
}