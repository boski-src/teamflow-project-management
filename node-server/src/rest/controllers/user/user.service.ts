import { Catch } from 'express-server-decorators';

import { UserRepository } from '../../../base';
import { IUserSchema } from '../../../common';

export class UserService {

  private userRepository : UserRepository;

  constructor () {
    this.userRepository = new UserRepository();
  }

  @Catch('An error occured while receiving user data.', 400)
  public async getOne (userId) : Promise<any> {
    let select = {
      id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      online: 1,
      profile: 1
    };
    let user = await this.userRepository.findById(userId, select);
    return user.formatDocument(['id', 'firstName', 'lastName', 'online', 'profile']);
  }

  @Catch('An error occured while searching users data.', 400)
  public async searchByName (name : string, limit : number = 50) : Promise<IUserSchema[]> {
    let select = {
      id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      online: 1
    };
    return await this.userRepository.findByName(name, select, { limit });
  }

}