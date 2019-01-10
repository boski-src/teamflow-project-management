import { ModelPopulateOptions, Types } from "mongoose";

import {
  IEventModel,
  IEventModelType,
  IEventRepositoryCreateNoteData,
  IEventRepositoryMethods,
  IEventSchema
} from '../../common/interfaces';

import { EventModel } from '../models/event';

export class EventRepository implements IEventRepositoryMethods {

  private model;

  constructor () {
    this.model = <IEventModelType>EventModel;
  }

  //Find

  public find (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IEventModel[]> {
    return this.model.find(conditions, select).populate(refs).exec();
  }

  public findOne (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IEventModel> {
    return this.model.findOne(conditions, select).populate(refs).exec();
  }

  public findById (
    id : Types.ObjectId,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IEventModel> {
    return this.model.findById(id, select).populate(refs).exec();
  }

  public findBelongProject (
    projectId : Types.ObjectId,
    select : object = {},
    opts? : object,
    refs : ModelPopulateOptions[] = []
  ) : Promise<IEventSchema[]> {
    let query = { _project: projectId };

    return this.model.find(query, select, opts).populate(refs).sort({ createdAt: 1 }).exec();
  }

  // Create

  public create (data) : Promise<IEventModel> {
    return new this.model(data).save();
  }

  public async createNote (id : Types.ObjectId, data : IEventRepositoryCreateNoteData) : Promise<IEventModel> {
    let query = {
      $push: {
        notes: data
      }
    };

    return this.model.findByIdAndUpdate(id, query, { new: true }).exec();
  }

  // Update

  public update (id : Types.ObjectId, data) : Promise<IEventModel> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Remove

  public delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<IEventModel> {
    return this.model.trashById(id, userId);
  }

  public async deleteNote (id : Types.ObjectId, noteId : Types.ObjectId) : Promise<IEventModel> {
    let event = await this.findById(id);
    let noteIndex = event.notes.findIndex(note => note._id == noteId);

    if (noteIndex < 0) return event;

    event.notes.splice(noteIndex, 1);
    return event.save();
  }

}

export const eventRepository = new EventRepository();