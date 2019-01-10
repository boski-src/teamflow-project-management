import { Catch } from 'express-server-decorators';

import { UserRepository } from '../../../base';
import { IUserModel, IUserRepositoryCreateData } from '../../../common';

export class AuthService {

  private userRepository : UserRepository;

  constructor () {
    this.userRepository = new UserRepository();
  }

  @Catch('Invalid credentials or session object.', 400)
  public async provideToken (user : IUserModel) : Promise<string> {
    return user.generateToken();
  }

  @Catch('Account with this email already exits.', 400)
  public async createAccount (data : IUserRepositoryCreateData) : Promise<object> {
    let create = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    };
    let user = await this.userRepository.create(create);

    return { token: await user.generateToken(), user: user.formatDocument() };
  }

}