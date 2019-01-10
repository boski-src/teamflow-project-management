import { Types } from 'mongoose';

export interface IProjectRepositoryCreateData {
  _team : Types.ObjectId
  name : string
  description : string
  manager : Types.ObjectId
  deadline? : Date
}