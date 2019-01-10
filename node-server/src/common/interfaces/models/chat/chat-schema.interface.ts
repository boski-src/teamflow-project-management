import { Document, Types } from 'mongoose';

import { IUserSchema } from '../user';
import { ITeamSchema } from '../team';
import { IMessageSchema } from '../message';

export interface IChatSchema extends Document {
  _id : Types.ObjectId
  id : Types.ObjectId
  _team : Types.ObjectId | ITeamSchema
  name : string
  description? : string
  manager : Types.ObjectId | IUserSchema
  messages : Types.ObjectId[] | IMessageSchema[]
  deleted : Boolean
  deletedAt : Date
  createdAt : Date
  updatedAt : Date
}