import { ModelPopulateOptions, Types } from 'mongoose';

import { ITaskModel, ITaskSchema } from '../../models/task';
import { ITaskRepositoryCreateData } from './task-repository-create-data.interface';
import { ITaskRepositoryCreateNoteData } from './task-repository-create-note-data.interface';

export interface ITaskRepositoryMethods {
  find (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITaskModel[]>

  findOne (
    conditions : object,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITaskModel>

  findById (
    id : Types.ObjectId,
    select? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITaskModel>

  findBelongProject (
    projectId : Types.ObjectId,
    select : object,
    opts? : object,
    refs? : ModelPopulateOptions[]
  ) : Promise<ITaskSchema[]>

  create (data : ITaskRepositoryCreateData) : Promise<ITaskModel>

  createNote (id : Types.ObjectId, data : ITaskRepositoryCreateNoteData) : Promise<ITaskModel>

  update (id : Types.ObjectId, data) : Promise<ITaskModel>

  delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITaskModel>

  deleteNote (id : Types.ObjectId, noteId : Types.ObjectId) : Promise<ITaskModel>
}