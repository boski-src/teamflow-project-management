import { Types } from 'mongoose';

import {
  IUserModel,
  IUserModelType,
  IUserProfile,
  IUserRepositoryCreateData,
  IUserRepositoryCreateFacebookData,
  IUserRepositoryCreateGitHubData,
  IUserRepositoryMethods,
  IUserSchema
} from '../../common/interfaces';

import { UserModel } from '../models/user';

export class UserRepository implements IUserRepositoryMethods {

  private model;

  constructor () {
    this.model = <IUserModelType>UserModel;
  }

  // Find

  public findById (id : Types.ObjectId, select? : object) : Promise<IUserModel> {
    return this.model.findById(id, select).exec();
  }

  public findByIds (ids : Types.ObjectId[], select? : object) : Promise<IUserModel[]> {
    let query = { _id: { $in: ids } };
    return this.model.find(query, select).exec();
  }

  public findByEmail (email : string, select? : object) : Promise<IUserModel> {
    return this.model.findOne({ email }, select).exec();
  }

  public findByApiKey (apiKey : string, select? : object) : Promise<IUserModel> {
    return this.model.findOne({ apiKey }, select).exec();
  }

  public findByCustom (field : string, value : any, select? : object) : Promise<IUserModel> {
    return this.model.findOne({ [field]: value }, select).exec();
  }

  public findByName (name : string, select : object = {}, opts? : object) : Promise<IUserSchema[]> {
    let query = {
      $or: [
        { firstName: { $regex: new RegExp(name, 'i') } },
        { lastName: { $regex: new RegExp(name, 'i') } }
      ]
    };

    return this.model.find(query, select, opts).exec();
  }

  public findByIdAndCheckPassword (id : Types.ObjectId, password : string) : Promise<IUserModel> {
    return this.model.findByIdAndCheckPassword(id, password);
  }

  public findByEmailAndCheckPassword (email : string, password : string) : Promise<IUserModel> {
    return this.model.findByEmailAndCheckPassword(email, password);
  }

  public findByIdAndCheckRecovery (id : Types.ObjectId, token : string) : Promise<IUserModel> {
    return this.model.findByIdAndCheckRecovery(id, token);
  }

  // Create

  public create (
    data :
      IUserRepositoryCreateData |
      IUserRepositoryCreateFacebookData |
      IUserRepositoryCreateGitHubData
  ) : Promise<IUserModel> {
    return new this.model(data).save();
  }

  // Update

  public updateEmail (id : Types.ObjectId, email : string) : Promise<IUserModel> {
    return this.model.findByIdAndUpdate(id, { email }, { new: true }).exec();
  }

  public updateProfile (id : Types.ObjectId, profile : IUserProfile) : Promise<IUserModel> {
    return this.model.findByIdAndUpdate(id, { profile }, { new: true }).exec();
  }

  public updateOnline (id : Types.ObjectId, online : boolean) : Promise<IUserModel> {
    return this.model.findByIdAndUpdate(id, { online }, { new: true }).exec();
  }

  public async updatePassword (id : Types.ObjectId, password : string) : Promise<IUserModel> {
    let user = await this.model.findById(id);
    user.password = password;
    return user.save();
  }

  public async updateApiKey (id : Types.ObjectId) : Promise<IUserModel> {
    let user = await this.model.findById(id);
    user.apiKey = 'refresh';
    return user.save();
  }

}

export const userRepository = new UserRepository();