import { IUserMethods, IUserModel, IUserStaticMethods } from '../../../common/interfaces';

import { pick } from 'lodash';
import { compare, hash } from 'bcrypt';
import { Types } from 'mongoose';

import { encodeJWT, randomBuffer } from '../../utils';

export const UserMethods : IUserMethods = {
  encodePassword (plainPassword : string) : Promise<string> {
    return hash(plainPassword, 12);
  },
  comparePassword (password : string) : Promise<boolean> {
    return compare(password, this.password);
  },
  generateRecoveryToken () : string {
    return randomBuffer(64);
  },
  compareRecoveryToken (token : string) : boolean {
    return this.recovery === token;
  },
  newAuthentication (ip : string) : Promise<IUserModel> {
    if (this.authentications.length >= 50) this.authentications.splice(0, 1);
    this.authentications.push({ from: ip });
    return this.save();
  },
  generateToken (isApi = false) : string {
    return encodeJWT({ id: this._id }, isApi);
  },
  formatDocument (props? : string[]) : object {
    let custom = ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'];
    return pick(this, props ? props : custom);
  }
};

export const UserStaticMethods : IUserStaticMethods = {
  async findByIdAndCheckPassword (id : Types.ObjectId, password : string) : Promise<IUserModel> {
    let user = await this.findById(id);
    if (!await user.comparePassword(password)) throw new Error('Password comparing failed.');
    return user;
  },
  async findByEmailAndCheckPassword (email : Types.ObjectId, password : string) : Promise<IUserModel> {
    let user = await this.findOne({ email });
    if (!await user.comparePassword(password)) throw new Error('Password comparing failed.');
    return user;
  },
  async findByIdAndCheckRecovery (id : Types.ObjectId, token : string) : Promise<IUserModel> {
    let user = await this.findById(id, { recovery: 1, email: 1 });
    if (!user.compareRecoveryToken(token)) throw new Error('Recovery token comparing failed.');
    return user;
  }
};