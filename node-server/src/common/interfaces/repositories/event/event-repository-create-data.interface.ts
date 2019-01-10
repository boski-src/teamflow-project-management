import { Types } from 'mongoose';

export interface IEventRepositoryCreateData {
  _project : Types.ObjectId
  name : string
  description : string
  author : Types.ObjectId
  colors : object
  start : Date
  end : Date
}