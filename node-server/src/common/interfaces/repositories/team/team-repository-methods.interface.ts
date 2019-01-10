import { ModelPopulateOptions, Types } from "mongoose";

import { ITeamModel, ITeamSchema } from '../../models/team';
import { ITeamRepositoryCreateData } from './team-repository-create-data.interface';
import { ITeamRepositoryUpdateData } from './team-repository-update-data.interface';

export interface ITeamRepositoryMethods {
  find (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITeamModel[]>

  findOne (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITeamModel>

  findById (
    id : Types.ObjectId,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITeamModel>

  findBelongByAdminity (
    userId : Types.ObjectId,
    select? : object,
    opts? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITeamSchema[]>

  findBelongByMembership (
    userId : Types.ObjectId,
    select? : object,
    opts? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITeamSchema[]>

  findBelongUser (
    userId : Types.ObjectId,
    select? : object,
    opts? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITeamSchema[]>

  findByIdAndCheckAdmin (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamModel>

  findByIdAndCheckAccess (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamModel>

  create (data : ITeamRepositoryCreateData) : Promise<ITeamModel>

  update (id : Types.ObjectId, data : ITeamRepositoryUpdateData) : Promise<ITeamModel>

  updateName (id : Types.ObjectId, name : string) : Promise<ITeamModel>

  updateDescription (id : Types.ObjectId, description : string) : Promise<ITeamModel>

  updateAdmins (id : Types.ObjectId, userIds : Types.ObjectId[]) : Promise<ITeamModel>

  updateMembers (id : Types.ObjectId, userIds : Types.ObjectId[]) : Promise<ITeamModel>

  updateProjects (id : Types.ObjectId, projectId : Types.ObjectId) : Promise<ITeamModel>

  updateChats (id : Types.ObjectId, chatId : Types.ObjectId) : Promise<ITeamModel>

  delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamModel>

}