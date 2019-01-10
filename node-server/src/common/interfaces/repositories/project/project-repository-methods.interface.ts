import { ModelPopulateOptions, Types } from "mongoose";

import { IProjectModel, IProjectSchema } from '../../models/project';
import { IProjectRepositoryCreateData } from './project-repository-create-data.interface';
import { IProjectRepositoryUpdateData } from './project-repository-update-data.interface';

export interface IProjectRepositoryMethods {
  find (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IProjectModel[]>

  findOne (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IProjectModel>

  findById (
    id : Types.ObjectId,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IProjectModel>

  findBelongTeam (
    teamId : Types.ObjectId,
    select? : object,
    opts? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<IProjectSchema[]>

  create (data : IProjectRepositoryCreateData) : Promise<IProjectModel>

  update (id : Types.ObjectId, data : IProjectRepositoryUpdateData) : Promise<IProjectModel>

  updateName (id : Types.ObjectId, name : string) : Promise<IProjectModel>

  updateDescription (id : Types.ObjectId, description : string) : Promise<IProjectModel>

  updateDeadline (id : Types.ObjectId, deadline : Date) : Promise<IProjectModel>

  updateFinished (id : Types.ObjectId, finished : boolean) : Promise<IProjectModel>

  updateTasks (id : Types.ObjectId, taskId : Types.ObjectId) : Promise<IProjectModel>

  updateEvents (id : Types.ObjectId, eventId : Types.ObjectId) : Promise<IProjectModel>

  delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<IProjectSchema>
}