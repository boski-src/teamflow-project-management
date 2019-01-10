import { Controller, Get, IRequest, Query, Validate } from 'express-server-decorators';

import { checkUserExists } from '../../rest.middlewares';
import { isAuth } from '../../rest.guards';

import { SearchUserQueryDto } from './dtos';
import { UserService } from './user.service';

@Controller('/users', {
  guards: [isAuth],
  params: [{ name: 'userId', handler: checkUserExists }]
})
export class UserController {

  private userService : UserService;

  constructor () {
    this.userService = new UserService();
  }

  @Validate()
  @Get('/search')
  public async search (@Query(SearchUserQueryDto) req : IRequest) {
    return await this.userService
      .searchByName(req.query.name, Number(req.query.limit));
  }

  @Get('/:userId')
  public async show (req : IRequest) {
    return await this.userService
      .getOne(req.params.userId);
  }

}