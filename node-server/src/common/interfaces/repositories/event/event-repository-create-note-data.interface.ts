import { Types } from 'mongoose';
import { IUserSchema } from '../../models/user';

export interface IEventRepositoryCreateNoteData {
  invoker : Types.ObjectId | IUserSchema,
  body : string,
}