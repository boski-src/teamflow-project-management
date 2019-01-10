import { Types } from 'mongoose';

export interface IMessageRepositoryCreateData {
  _chat : Types.ObjectId
  invoker : Types.ObjectId
  body : string
}