import * as sharp from 'sharp';
import { Types } from 'mongoose';
import { Catch } from 'express-server-decorators';

import { UserRepository } from '../../../base';
import { IUserAuthentication, IUserModel, IUserNotification, IUserProfile } from '../../../common';
import { HexBase64BinaryEncoding } from 'crypto';

export class AccountService {

  private userRepository : UserRepository;

  constructor () {
    this.userRepository = new UserRepository();
  }

  @Catch('An error occured while receiving an account data.', 400)
  public async getCurrent (user : IUserModel) : Promise<object> {
    return user.formatDocument();
  }

  @Catch('An error occured while receiving an account data.', 400)
  public async getToken (user : IUserModel) : Promise<string> {
    return user.generateToken();
  }

  @Catch('An error occured while receiving an apikey.', 400)
  public async getApiKey (user : IUserModel) : Promise<string> {
    return user.apiKey;
  }

  @Catch('An error occured while receiving an account profile data.', 400)
  public async getProfile (user : IUserModel) : Promise<IUserProfile> {
    return user.profile;
  }

  @Catch('An error occured while receiving an account auths attempts.', 400)
  public async getAuthentications (user : IUserModel) : Promise<IUserAuthentication[]> {
    return user.authentications;
  }

  @Catch('An error occured while receiving an account notify data.', 400)
  public async getNotifications (user : IUserModel) : Promise<IUserNotification[]> {
    return user.notifications;
  }

  @Catch('This email is already being used by another account.', 400)
  public async editEmail (userId : Types.ObjectId, newEmail : string) : Promise<string> {
    let updated = await this.userRepository.updateEmail(userId, newEmail);
    return updated.email;
  }

  @Catch('Entered password is invalid.', 400)
  public async editPassword (userId : Types.ObjectId, newPassword : string) : Promise<boolean> {
    let updated = await this.userRepository.updatePassword(userId, newPassword);
    return !!updated;
  }

  @Catch('Profile details is invalid.', 400)
  public async editProfile (userId : Types.ObjectId, newProfile : IUserProfile) : Promise<IUserProfile> {
    let profile : IUserProfile = {
      fullName: newProfile.fullName,
      about: newProfile.about,
      title: newProfile.title,
      community: newProfile.community,
    };

    let updated = await this.userRepository.updateProfile(userId, profile);
    return updated.profile;
  }

  @Catch('Avatar data is invalid.', 400)
  public async uploadAvatar (userId : Types.ObjectId, base64Data : HexBase64BinaryEncoding) : Promise<boolean> {
    let buffer = new Buffer(base64Data.split(',')[1], 'base64');

    await sharp(buffer)
      .resize(200, 200, {
        fit: 'contain'
      })
      .flatten()
      .toFile(`${__dirname}/../../../../storage/avatars/${userId}.png`);

    return true;
  }

  @Catch('An error occured while creating a new api key.', 400)
  public async renewApiKey (userId : Types.ObjectId) : Promise<string> {
    let updated = await this.userRepository.updateApiKey(userId);
    return updated.apiKey;
  }

}