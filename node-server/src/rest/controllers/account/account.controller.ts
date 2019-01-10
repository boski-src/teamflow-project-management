import { Body, Controller, Get, IRequest, Patch, Validate } from 'express-server-decorators';

import { isAuth, confirmPassword } from '../../rest.guards';

import {
  UpdateAccountAvatarBodyDto,
  UpdateAccountEmailBodyDto,
  UpdateAccountPasswordBodyDto,
  UpdateAccountProfileBodyDto
} from './dtos';
import { AccountService } from './account.service';

@Controller('/account', {
  guards: [isAuth]
})
export class AccountController {

  private accountService : AccountService;

  constructor () {
    this.accountService = new AccountService();
  }

  @Get('/')
  public async showCurrent (req : IRequest) {
    return await this.accountService
      .getCurrent(req.account);
  }

  @Get('/token')
  public async showToken (req : IRequest) {
    return await this.accountService
      .getToken(req.account);
  }

  @Get('/apikey')
  public async showApiKey (req : IRequest) {
    return await this.accountService
      .getApiKey(req.account);
  }

  @Get('/profile')
  public async showProfile (req : IRequest) {
    return await this.accountService
      .getProfile(req.account);
  }

  @Get('/authentications')
  public async showAuthentications (req : IRequest) {
    return await this.accountService
      .getAuthentications(req.account);
  }

  @Get('/notifications')
  public async showNotifications (req : IRequest) {
    return await this.accountService
      .getNotifications(req.account);
  }

  @Validate()
  @Patch('/email', [confirmPassword])
  public async updateEmail (@Body(UpdateAccountEmailBodyDto) req : IRequest) {
    return await this.accountService
      .editEmail(req.account, req.body.newEmail);
  }

  @Validate()
  @Patch('/password', [confirmPassword])
  public async updatePassword (@Body(UpdateAccountPasswordBodyDto) req : IRequest) {
    return await this.accountService
      .editPassword(req.account, req.body.newPassword);
  }

  @Validate()
  @Patch('/avatar')
  public async updateAvatar (@Body(UpdateAccountAvatarBodyDto) req : IRequest) {
    return await this.accountService
      .uploadAvatar(req.account.id, req.body.avatar);
  }

  @Validate()
  @Patch('/profile')
  public async updateProfile (@Body(UpdateAccountProfileBodyDto) req : IRequest) {
    return await this.accountService
      .editProfile(req.account, req.body.profile);
  }

  @Patch('/apikey', [confirmPassword])
  public async updateApiKey (req : IRequest) {
    return await this.accountService
      .renewApiKey(req.account);
  }

}