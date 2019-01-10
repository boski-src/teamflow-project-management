import { Body, Controller, IRequest, IResponse, Post, Validate } from 'express-server-decorators';

import { passportAuthenticate } from '../../../base';
import { IUserModel } from '../../../common';

import { CreateLocalBodyDto, LocalLoginBodyDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {

  private authService : AuthService;

  constructor () {
    this.authService = new AuthService();
  }

  @Validate()
  @Post('/local')
  public async localLogin (@Body(LocalLoginBodyDto) req : IRequest, res : IResponse) {
    let user : IUserModel = await passportAuthenticate('local')(req, res);
    return await this.authService.provideToken(user);
  }

  @Validate()
  @Post('/local/create')
  public async createLocalAccount (@Body(CreateLocalBodyDto) req : IRequest) {
    return await this.authService.createAccount(req.body);
  }

  //@Validate() todo add access_token validation
  @Post('/facebook')
  public async facebookLogin (req : IRequest, res : IResponse) {
    let user : IUserModel = await passportAuthenticate('facebook-token')(req, res);
    return await this.authService.provideToken(user);
  }

}