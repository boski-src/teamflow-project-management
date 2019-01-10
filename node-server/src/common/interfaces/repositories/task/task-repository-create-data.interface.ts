import { Types } from 'mongoose';

export interface ITaskRepositoryCreateData {
  _project : Types.ObjectId
  name : string
  description : string
  author : Types.ObjectId
  state : number,
  priority : number,
  due : Date,
}