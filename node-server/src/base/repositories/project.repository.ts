import { ModelPopulateOptions, Types } from "mongoose";
import {
  IProjectModel,
  IProjectModelType,
  IProjectRepositoryCreateData,
  IProjectRepositoryMethods,
  IProjectRepositoryUpdateData,
  IProjectSchema
} from '../../common/interfaces';

import { pushOrSplice } from '../utils';

import { ProjectModel } from '../models/project';

export class ProjectRepository implements IProjectRepositoryMethods {

  private model;

  constructor () {
    this.model = <IProjectModelType>ProjectModel;
  }

  //Find

  public find (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IProjectModel[]> {
    return this.model.find(conditions, select).populate(refs).exec();
  }

  public findOne (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IProjectModel> {
    return this.model.findOne(conditions, select).populate(refs).exec();
  }

  public findById (
    id : Types.ObjectId,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IProjectModel> {
    return this.model.findById(id, select).populate(refs).exec();
  }

  public findBelongTeam (
    teamId : Types.ObjectId,
    select : object = {},
    opts? : object,
    refs : ModelPopulateOptions[] = []
  ) : Promise<IProjectSchema[]> {
    let query = { _team: teamId };

    return this.model.find(query, select, opts).populate(refs).sort({ createdAt: 1 }).exec();
  }

  // Create

  public create (data : IProjectRepositoryCreateData) : Promise<IProjectModel> {
    return new this.model(data).save();
  }

  // Update

  public update (id : Types.ObjectId, data : IProjectRepositoryUpdateData) : Promise<IProjectModel> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public updateName (id : Types.ObjectId, name : string) : Promise<IProjectModel> {
    return this.model.findByIdAndUpdate(id, { name }, { new: true }).exec();
  }

  public updateDescription (id : Types.ObjectId, description : string) : Promise<IProjectModel> {
    return this.model.findByIdAndUpdate(id, { description }, { new: true }).exec();
  }

  public updateDeadline (id : Types.ObjectId, deadline : Date) : Promise<IProjectModel> {
    return this.model.findByIdAndUpdate(id, { deadline }, { new: true }).exec();
  }

  public updateFinished (id : Types.ObjectId, finished : boolean) : Promise<IProjectModel> {
    return this.model.findByIdAndUpdate(id, { finished }, { new: true }).exec();
  }

  public async updateTasks (id : Types.ObjectId, taskId : Types.ObjectId) : Promise<IProjectModel> {
    let project = await this.findById(id);
    project.tasks = pushOrSplice(project.tasks, taskId);
    return project.save();
  }

  public async updateEvents (id : Types.ObjectId, eventId : Types.ObjectId) : Promise<IProjectModel> {
    let project = await this.findById(id);
    project.events = pushOrSplice(project.events, eventId);
    return project.save();
  }

  // Remove

  public delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<IProjectModel> {
    return this.model.trashById(id, userId);
  }

}

export const projectRepository = new ProjectRepository();