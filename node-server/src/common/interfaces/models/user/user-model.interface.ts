import { Model } from 'mongoose';

import { IUserSchema } from './user-schema.interface';
import { IUserMethods, IUserStaticMethods } from './user-methods.interface';

export interface IUserModel extends IUserMethods, IUserStaticMethods, IUserSchema {
}

export interface IUserModelType extends Model<IUserModel> {
}