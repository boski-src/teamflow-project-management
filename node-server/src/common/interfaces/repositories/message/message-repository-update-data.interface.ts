import { Types } from 'mongoose';

export interface IMessageRepositoryUpdateData {
  invoker : Types.ObjectId
  body : string
}