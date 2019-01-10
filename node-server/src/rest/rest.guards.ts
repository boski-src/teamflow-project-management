import { Body, INext, IRequest, IResponse, Params, Validate } from 'express-server-decorators';

import { userRepository } from '../base';

import { ConfirmAccountPasswordBodyDto } from './controllers/account/dtos';
import { CheckAccessParamsDto } from './controllers/team/dtos';

export class RESTGuards {

  public isAuth (req : IRequest, res : IResponse, next : INext) : void {
    if (!req.account)
      return next({
        status: 401,
        message: 'Unauthenticated.'
      });
    next();
  }

  @Validate()
  public async confirmPassword (@Body(ConfirmAccountPasswordBodyDto) req : IRequest, res : IResponse, next : INext) {
    try {
      await userRepository.findByIdAndCheckPassword(req.account.id, req.body.password);
    }
    catch (e) {
      return next({
        message: 'Unauthorized, invalid password.',
        status: 403
      });
    }
    next();
  }

  @Validate()
  public async isTeamAdmin (@Params(CheckAccessParamsDto) req : IRequest, res : IResponse, next : INext) {
    if (!req.team.isAdmin(req.account.id))
      return next({
        message: 'Unauthorized, you aren\'t admin of this team.',
        status: 403
      });
    next();
  }

  @Validate()
  public async isTeamMember (@Params(CheckAccessParamsDto) req : IRequest, res : IResponse, next : INext) {
    if (!req.team.isMember(req.account.id))
      return next({
        message: 'Unauthorized, you aren\'t member of this team.',
        status: 403
      });
    next();
  }

  @Validate()
  public async hasTeamAccess (@Params(CheckAccessParamsDto) req : IRequest, res : IResponse, next : INext) {
    if (!req.team.hasAccess(req.account.id))
      return next({
        message: 'Unauthorized, you aren\'t member or admin of this team.',
        status: 403
      });
    next();
  }

}

export const restGuards = new RESTGuards();
export const {
  isAuth,
  confirmPassword,
  isTeamAdmin,
  isTeamMember,
  hasTeamAccess
} = restGuards;