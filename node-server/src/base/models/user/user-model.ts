import { Schema } from 'mongoose';

import { mongoModel, mongoSchema } from '../../libs/mongo';
import { IUserModelType, IUserSchema } from '../../../common/interfaces';

import { UserStructure } from './user-structure';
import { UserMethods, UserStaticMethods } from './user-methods';

const UserSchema : Schema = mongoSchema(UserStructure, UserMethods, UserStaticMethods);

UserSchema.pre<any>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await this.encodePassword(this.password);
    this.recovery = this.generateRecoveryToken();
  } else if (this.isNew) {
    this.recovery = this.generateRecoveryToken();
  }

  if (this.isModified('apiKey')) this.apiKey = this.generateToken(true);

  next();
});

export const UserModel : IUserModelType = mongoModel<IUserSchema, IUserModelType>('User', UserSchema);