import { ModelPopulateOptions, Types } from 'mongoose';

import {
  ITeamModel,
  ITeamModelType,
  ITeamRepositoryCreateData,
  ITeamRepositoryMethods,
  ITeamRepositoryUpdateData,
  ITeamSchema,
} from '../../common/interfaces';

import { pushOrSplice, pushOrSpliceArray } from '../utils';

import { TeamModel } from '../models/team';

export class TeamRepository implements ITeamRepositoryMethods {

  private model;

  constructor () {
    this.model = <ITeamModelType>TeamModel;
  }

  // Find

  public find (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITeamModel[]> {
    return this.model.find(conditions, select).populate(refs).exec();
  }

  public findOne (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITeamModel> {
    return this.model.findOne(conditions, select).populate(refs).exec();
  }

  public findById (
    id : Types.ObjectId,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITeamModel> {
    return this.model.findById(id, select).populate(refs).exec();
  }

  public findBelongByAdminity (
    userId : Types.ObjectId,
    select : object = {},
    opts? : object,
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITeamSchema[]> {
    let query = { admins: { $in: userId } };

    return this.model.find(query, select, opts).populate(refs).sort({ createdAt: 1 }).exec();
  }

  public findBelongByMembership (
    userId : Types.ObjectId,
    select : object = {},
    opts? : object,
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITeamSchema[]> {
    let query = { members: { $in: userId } };

    return this.model.find(query, select, opts).populate(refs).sort({ createdAt: 1 }).exec();
  }

  public findBelongUser (
    userId : Types.ObjectId,
    select : object = {},
    opts? : object,
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITeamSchema[]> {
    let query = {
      $or: [
        { admins: { $in: userId } },
        { members: { $in: userId } }
      ]
    };

    return this.model.find(query, select, opts).populate(refs).sort({ createdAt: 1 }).exec();
  }

  public findByIdAndCheckAdmin (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamModel> {
    return this.model.findByIdAndCheckAdmin(id, userId);
  }

  public findByIdAndCheckAccess (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamModel> {
    return this.model.findByIdAndCheckAccess(id, userId);
  }

  // Create

  public create (data : ITeamRepositoryCreateData) : Promise<ITeamModel> {
    return new this.model(data).save();
  }

  // Update

  public update (id : Types.ObjectId, data : ITeamRepositoryUpdateData) : Promise<ITeamModel> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public updateName (id : Types.ObjectId, name : string) : Promise<ITeamModel> {
    return this.model.findByIdAndUpdate(id, { name }, { new: true }).exec();
  }

  public updateDescription (id : Types.ObjectId, description : string) : Promise<ITeamModel> {
    return this.model.findByIdAndUpdate(id, { description }, { new: true }).exec();
  }

  public async updateAdmins (id : Types.ObjectId, userIds : Types.ObjectId[]) : Promise<ITeamModel> {
    let team = await this.findById(id);
    team.admins = pushOrSpliceArray(team.admins, userIds);
    return team.save();
  }

  public async updateMembers (id : Types.ObjectId, userIds : Types.ObjectId[]) : Promise<ITeamModel> {
    let team = await this.findById(id);
    team.members = pushOrSpliceArray(team.members, userIds);
    return team.save();
  }

  public async updateProjects (id : Types.ObjectId, projectId : Types.ObjectId) : Promise<ITeamModel> {
    let team = await this.findById(id);
    team.projects = pushOrSplice(team.projects, projectId);
    return team.save();
  }

  public async updateChats (id : Types.ObjectId, chatId : Types.ObjectId) : Promise<ITeamModel> {
    let team = await this.findById(id);
    team.chats = pushOrSplice(team.chats, chatId);
    return team.save();
  }

  // Remove

  public delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamModel> {
    return this.model.trashById(id, userId);
  }

}

export const teamRepository = new TeamRepository();