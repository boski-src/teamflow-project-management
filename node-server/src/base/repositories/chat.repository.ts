import { ModelPopulateOptions, Types } from 'mongoose';
import {
  IChatModel,
  IChatModelType,
  IChatRepositoryCreateData,
  IChatRepositoryMethods,
  IChatRepositoryUpdateData,
  IChatSchema
} from '../../common/interfaces';

import { ChatModel } from '../models/chat';
import { pushOrSplice } from '../utils';

export class ChatRepository implements IChatRepositoryMethods {

  private model;

  constructor () {
    this.model = <IChatModelType>ChatModel;
  }

  //Find

  public find (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IChatModel[]> {
    return this.model.find(conditions, select).populate(refs).exec();
  }

  public findOne (
    conditions : object,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IChatModel> {
    return this.model.findOne(conditions, select).populate(refs).exec();
  }

  public findById (
    id : Types.ObjectId,
    select : object = {},
    refs : ModelPopulateOptions[] = []
  ) : Promise<IChatModel> {
    return this.model.findById(id, select).populate(refs).exec();
  }

  public findBelongTeam (
    teamId : Types.ObjectId,
    select : object = {},
    opts? : object,
    refs : ModelPopulateOptions[] = []
  ) : Promise<IChatSchema[]> {
    let query = { _team: teamId };

    return this.model.find(query, select, opts).populate(refs).sort({ createdAt: 1 }).exec();
  }

  // Create

  public create (data : IChatRepositoryCreateData) : Promise<IChatModel> {
    return new this.model(data).save();
  }

  // Update

  public update (id : Types.ObjectId, data : IChatRepositoryUpdateData) : Promise<IChatModel> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public updateName (id : Types.ObjectId, name : string) : Promise<IChatModel> {
    return this.model.findByIdAndUpdate(id, { name }, { new: true }).exec();
  }

  public updateDescription (id : Types.ObjectId, description : string) : Promise<IChatModel> {
    return this.model.findByIdAndUpdate(id, { description }, { new: true }).exec();
  }

  public async updateMessages (id : Types.ObjectId, messageId : Types.ObjectId) : Promise<IChatModel> {
    let chat = await this.findById(id);
    chat.messages = pushOrSplice(chat.messages, messageId);
    return chat.save();
  }

  // Remove

  public delete (id : Types.ObjectId, userId : Types.ObjectId) : Promise<IChatModel> {
    return this.model.trashById(id, userId);
  }

}

export const chatRepository = new ChatRepository();