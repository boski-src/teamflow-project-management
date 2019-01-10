import { ModelPopulateOptions, Types } from "mongoose";
import {
  ITaskModel,
  ITaskModelType,
  ITaskRepositoryCreateData,
  ITaskRepositoryCreateNoteData,
  ITaskRepositoryMethods,
  ITaskSchema
} from '../../common/interfaces';

import { TaskModel } from '../models/task';

export class TaskRepository implements ITaskRepositoryMethods {

  private model;

  constructor () {
    this.model = <ITaskModelType>TaskModel;
  }

  //Find

  public find (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITaskModel[]> {
    return this.model.find(conditions, select).populate(refs).exec();
  }

  public findOne (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITaskModel> {
    return this.model.findOne(conditions, select).populate(refs).exec();
  }

  public findById (
    id : Types.ObjectId,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITaskModel> {
    return this.model.findById(id, select).populate(refs).exec();
  }

  public findBelongProject (
    projectId : Types.ObjectId,
    select : object = {},
    opts? : object,
    refs : ModelPopulateOptions[] = []
  ) : Promise<ITaskSchema[]> {
    let query = { _project: projectId };

    return this.model.find(query, select, opts).populate(refs).sort({ createdAt: 1 }).exec();
  }

  // Create

  public create (data : ITaskRepositoryCreateData) : Promise<ITaskModel> {
    return new this.model(data).save();
  }

  public async createNote (id : Types.ObjectId, data : ITaskRepositoryCreateNoteData) : Promise<ITaskModel> {
    let query = {
      $push: {
        notes: data
      }
    };

    return this.model.findByIdAndUpdate(id, query, { new: true }).exec();
  }

  // Update

  public update (id : Types.ObjectId, data) : Promise<ITaskModel> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Remove

  public delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITaskModel> {
    return this.model.trashById(id, userId);
  }

  public async deleteNote (id : Types.ObjectId, noteId : Types.ObjectId) : Promise<ITaskModel> {
    let task = await this.findById(id);
    let noteIndex = task.notes.findIndex(note => note._id == noteId);

    if (noteIndex < 0) return task;

    task.notes.splice(noteIndex, 1);
    return task.save();
  }

}

export const taskRepository = new TaskRepository();