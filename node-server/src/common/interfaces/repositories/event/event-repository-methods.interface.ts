import { ModelPopulateOptions, Types } from "mongoose";
import { IEventModel, IEventSchema } from '../../models/event';

export interface IEventRepositoryMethods {
  find (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IEventModel[]>

  findOne (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IEventModel>

  findById (
    id : Types.ObjectId,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IEventModel>

  findBelongProject (
    projectId : Types.ObjectId,
    select : object,
    opts? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IEventSchema[]>

  create (data) : Promise<IEventModel>

  createNote (id : Types.ObjectId, data) : Promise<IEventModel>

  update (id : Types.ObjectId, data) : Promise<IEventModel>

  delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<IEventModel>

  deleteNote (id : Types.ObjectId, noteId : Types.ObjectId) : Promise<IEventModel>
}