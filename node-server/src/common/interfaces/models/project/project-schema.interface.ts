import { Document, Types } from 'mongoose';
import { ITeamSchema } from '../team';
import { IUserSchema } from '../user';
import { ITaskSchema } from '../task';
import { IEventSchema } from '../event';

export interface IProjectSchema extends Document {
  _id : Types.ObjectId
  id : Types.ObjectId
  _team : Types.ObjectId | ITeamSchema
  name : string
  description : string
  leader : Types.ObjectId | IUserSchema
  tasks : Types.ObjectId[] | ITaskSchema[]
  events : Types.ObjectId[] | IEventSchema[]
  deadline? : Date
  finished : boolean
  deleted : Boolean
  deletedAt : Date
  createdAt : Date
  updatedAt : Date
}