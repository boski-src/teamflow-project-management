import { Document, Types } from 'mongoose';
import { IUserSchema } from '../user';
import { IProjectSchema } from '../project';

export interface ITaskSchema extends Document {
  _id : Types.ObjectId
  id : Types.ObjectId
  _project : Types.ObjectId | IProjectSchema,
  name : string,
  description? : string,
  author : Types.ObjectId | IUserSchema,
  state : number,
  priority : number,
  due : Date,
  notes : ITaskNote[]
  deleted : Boolean
  deletedAt : Date
  createdAt : Date
  updatedAt : Date
}

export interface ITaskNote {
  _id? : Types.ObjectId
  id? : Types.ObjectId
  invoker : Types.ObjectId | IUserSchema,
  body : string,
  date? : Date
}