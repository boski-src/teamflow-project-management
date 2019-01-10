import { Body, Controller, Get, IRequest, Params, Post, Validate } from 'express-server-decorators';

import { CheckTokenParamsDto, RebuildPasswordBodyDto, RebuildPasswordParamsDto, SendMailParamsDto } from './dtos';
import { RecoveryService } from './recovery.service';

@Controller('/recovery')
export class RecoveryController {

  private recoveryService : RecoveryService;

  constructor () {
    this.recoveryService = new RecoveryService();
  }

  @Validate()
  @Get('/:email')
  public async sendMail (@Params(SendMailParamsDto) req : IRequest) {
    return await this.recoveryService
      .sendEmail(req.params.email);
  }

  @Validate()
  @Get('/:userId/:token')
  public async checkToken (@Params(CheckTokenParamsDto) req : IRequest) {
    return await this.recoveryService
      .validateToken(req.params.userId, req.params.token);
  }

  @Validate()
  @Post('/:userId/:token')
  public async rebuildPassword (
    @Body(RebuildPasswordBodyDto)
    @Params(RebuildPasswordParamsDto)
      req : IRequest
  ) {
    return await this.recoveryService
      .updatePassword(req.params.userId, req.params.token, req.body.newPassword);
  }

}