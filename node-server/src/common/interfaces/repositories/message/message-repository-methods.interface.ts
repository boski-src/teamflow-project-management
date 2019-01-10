import { ModelPopulateOptions, Types } from "mongoose";

import { IMessageModel, IMessageSchema } from '../../models/message';
import { IMessageRepositoryCreateData } from './message-repository-create-data.interface';
import { IMessageRepositoryUpdateData } from './message-repository-update-data.interface';

export interface IMessageRepositoryMethods {
  find (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IMessageModel[]>

  findOne (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IMessageModel>

  findById (
    id : Types.ObjectId,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IMessageModel>

  findBelongChat (
    chatId : Types.ObjectId,
    select? : object,
    opts? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IMessageSchema[]>

  create (data : IMessageRepositoryCreateData) : Promise<IMessageModel>

  update (id : Types.ObjectId, data : IMessageRepositoryUpdateData) : Promise<IMessageModel>

  delete (id : Types.ObjectId, userId : Types.ObjectId)
}