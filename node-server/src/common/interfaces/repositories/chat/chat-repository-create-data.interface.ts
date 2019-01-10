import { Types } from 'mongoose';

export interface IChatRepositoryCreateData {
  _team : Types.ObjectId
  name : string
  description : string
  manager : Types.ObjectId
}