import { ModelPopulateOptions, Types } from "mongoose";

import { IChatModel, IChatSchema } from '../../models/chat';
import { IChatRepositoryCreateData } from './chat-repository-create-data.interface';
import { IChatRepositoryUpdateData } from './chat-repository-update-data.interface';

export interface IChatRepositoryMethods {
  find (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IChatModel[]>

  findOne (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IChatModel>

  findById (
    id : Types.ObjectId,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IChatModel>

  findBelongTeam (
    teamId : Types.ObjectId,
    select? : object,
    opts? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IChatSchema[]>

  create (data : IChatRepositoryCreateData) : Promise<IChatModel>

  update (id : Types.ObjectId, data : IChatRepositoryUpdateData) : Promise<IChatModel>

  updateName (id : Types.ObjectId, name : string) : Promise<IChatModel>

  updateDescription (id : Types.ObjectId, description : string) : Promise<IChatModel>

  updateMessages (id : Types.ObjectId, messageId : Types.ObjectId) : Promise<IChatModel>

  delete (id : Types.ObjectId, userId : Types.ObjectId)
}