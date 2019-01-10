import { Types } from 'mongoose';

import { IUserModel, IUserProfile } from '../../models/user';
import { IUserRepositoryCreateFacebookData } from './user-repository-create-facebook-data.interface';
import { IUserRepositoryCreateData } from './user-repository-create-data.interface';

export interface IUserRepositoryMethods {
  findById (
    id : Types.ObjectId,
    select? : object,
  ) : Promise<IUserModel>

  findByIds (
    ids : Types.ObjectId[],
    select? : object,
  ) : Promise<IUserModel[]>

  findByEmail (email : string, select? : object) : Promise<IUserModel>

  findByApiKey (apiKey : string, select? : object) : Promise<IUserModel>

  findByCustom (field : string, value : any, select? : object) : Promise<IUserModel>

  findByIdAndCheckPassword (id : Types.ObjectId, password : string) : Promise<IUserModel>

  findByEmailAndCheckPassword (email : string, password : string) : Promise<IUserModel>

  findByIdAndCheckRecovery (id : Types.ObjectId, token : string) : Promise<IUserModel>

  create (data : IUserRepositoryCreateData | IUserRepositoryCreateFacebookData) : Promise<IUserModel>

  updateEmail (id : Types.ObjectId, email : string) : Promise<IUserModel>

  updateProfile (id : Types.ObjectId, profile : IUserProfile) : Promise<IUserModel>

  updatePassword (id : Types.ObjectId, password : string) : Promise<IUserModel>

  updateApiKey (id : Types.ObjectId) : Promise<IUserModel>
}