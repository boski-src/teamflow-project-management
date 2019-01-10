import { Types } from 'mongoose';
import { IUserSchema } from '../../models/user';

export interface ITaskRepositoryCreateNoteData {
  invoker : Types.ObjectId | IUserSchema,
  body : string,
}