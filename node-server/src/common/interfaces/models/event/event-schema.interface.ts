import { Document, Types } from 'mongoose';

import { IUserSchema } from '../user';
import { IProjectSchema } from '../project';

export interface IEventSchema extends Document {
  _id : Types.ObjectId
  id : Types.ObjectId
  _project : Types.ObjectId | IProjectSchema
  name : string
  description? : string
  author : Types.ObjectId | IUserSchema
  start : Date
  end : Date
  colors : { primary : string, secondary : string }
  notes : IEventNote[]
  deleted : Boolean
  deletedAt : Date
  createdAt : Date
  updatedAt : Date
}

export interface IEventNote {
  _id? : Types.ObjectId
  id? : Types.ObjectId
  invoker : Types.ObjectId | IUserSchema
  body : string,
  date? : Date
}