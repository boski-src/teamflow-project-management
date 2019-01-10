import { ModelPopulateOptions, Types } from "mongoose";
import {
  IMessageModel, IMessageModelType,
  IMessageRepositoryCreateData,
  IMessageRepositoryMethods,
  IMessageRepositoryUpdateData,
} from '../../common/interfaces';

import { MessageModel } from '../models/message';

export class MessageRepository implements IMessageRepositoryMethods {

  private model;

  constructor () {
    this.model = <IMessageModelType>MessageModel;
  }

  //Find

  public find (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IMessageModel[]> {
    return this.model.find(conditions, select).populate(refs).exec();
  }

  public findOne (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IMessageModel> {
    return this.model.findOne(conditions, select).populate(refs).exec();
  }

  public findById (
    id : Types.ObjectId,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IMessageModel> {
    return this.model.findById(id, select).populate(refs).exec();
  }

  public findBelongChat (
    chatId : Types.ObjectId,
    select : object = {},
    opts? : object,
    refs : ModelPopulateOptions[] = []
  ) : Promise<IMessageModel[]> {
    let query = { _chat: chatId };

    return this.model.find(query, select, opts).populate(refs).sort({ createdAt: -1 }).exec();
  }

  // Create

  public create (data : IMessageRepositoryCreateData) : Promise<IMessageModel> {
    return new this.model(data).save();
  }

  // Update

  public update (id : Types.ObjectId, data : IMessageRepositoryUpdateData) : Promise<IMessageModel> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Remove

  public delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<IMessageModel> {
    return this.model.trashById(id, userId);
  }

}

export const messageRepository = new MessageRepository();