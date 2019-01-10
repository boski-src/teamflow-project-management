import { Controller, Get, IRequest, IResponse, Params, Validate } from 'express-server-decorators';

import { CheckUserParamDto } from './dtos';
import { StorageService } from './storage.service';

@Controller('/storage')
export class StorageController {

  private storageService : StorageService;

  constructor () {
    this.storageService = new StorageService();
  }

  @Validate()
  @Get('/avatars/:userId')
  public async show (@Params(CheckUserParamDto) req : IRequest, res : IResponse) {
    let path : Buffer = await this.storageService.getAvatar(req.params.userId);

    res.type('png');
    res.send(path);
  }

}