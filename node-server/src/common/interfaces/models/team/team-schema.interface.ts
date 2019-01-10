import { Document, Types } from 'mongoose';

import { IProjectSchema } from '../project';
import { IUserSchema } from '../user';
import { IChatSchema } from '../chat';

export interface ITeamSchema extends Document {
  _id : Types.ObjectId
  name : string
  description? : string
  admins : Types.ObjectId[] | IUserSchema[]
  members : Types.ObjectId[] | IUserSchema[]
  projects : Types.ObjectId[] | IProjectSchema[]
  chats : Types.ObjectId[] | IChatSchema[]
  deleted : Boolean
  deletedAt : Date
  createdAt : Date
  updatedAt : Date
}