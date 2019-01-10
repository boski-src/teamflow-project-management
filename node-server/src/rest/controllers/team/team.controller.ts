import { Body, Controller, Delete, Get, IRequest, Patch, Post, Put, Query, Validate } from 'express-server-decorators';

import { checkTeamExists } from '../../rest.middlewares';
import { confirmPassword, hasTeamAccess, isAuth, isTeamAdmin, isTeamMember } from '../../rest.guards';

import {
  CheckTeamListLimitQueryDto,
  CreateTeamBodyDto,
  UpdateTeamAdminsBodyDto,
  UpdateTeamBodyDto,
  UpdateTeamDescriptionBodyDto,
  UpdateTeamMembersBodyDto,
  UpdateTeamNameBodyDto
} from './dtos';

import { TeamService } from './team.service';

@Controller('/teams', {
  guards: [isAuth],
  params: [{ name: 'teamId', handler: checkTeamExists }]
})
export class TeamController {

  private teamService : TeamService;

  constructor () {
    this.teamService = new TeamService();
  }

  @Validate()
  @Post('/')
  public async create (@Body(CreateTeamBodyDto) req : IRequest) {
    return await this.teamService
      .insert(req.account.id, req.body);
  }

  @Validate()
  @Get('/')
  public async showAllUser (req : IRequest) {
    return await this.teamService
      .getBelongUser(req.account.id);
  }

  @Validate()
  @Get('/page')
  public async showAllUserPaginate (@Query(CheckTeamListLimitQueryDto) req : IRequest) {
    return await this.teamService
      .getBelongUserPaginate(req.account.id, Number(req.query.start), Number(req.query.limit));
  }

  @Get('/:teamId', [hasTeamAccess])
  public async show (req : IRequest) {
    return await this.teamService
      .getOne(req.params.teamId);
  }

  @Get('/:teamId/access')
  public async showAccess (req : IRequest) {
    return await this.teamService
      .getAccess(req.team, req.account.id);
  }

  @Get('/:teamId/admins', [hasTeamAccess])
  public async showAdmins (req : IRequest) {
    return await this.teamService
      .getAdmins(req.params.teamId);
  }

  @Validate()
  @Get('/:teamId/admins/page', [hasTeamAccess])
  public async showAdminsPaginate (@Query(CheckTeamListLimitQueryDto) req : IRequest) {
    return await this.teamService
      .getAdminsPaginate(req.params.teamId, Number(req.query.start), Number(req.query.limit));
  }

  @Get('/:teamId/members', [hasTeamAccess])
  public async showMembers (req : IRequest) {
    return await this.teamService
      .getMembers(req.params.teamId);
  }

  @Validate()
  @Get('/:teamId/members/page', [hasTeamAccess])
  public async showMembersPaginate (@Query(CheckTeamListLimitQueryDto) req : IRequest) {
    return await this.teamService
      .getMembersPaginate(req.params.teamId, Number(req.query.start), Number(req.query.limit));
  }

  @Validate()
  @Put('/:teamId', [isTeamAdmin])
  public async update (@Body(UpdateTeamBodyDto) req : IRequest) {
    return await this.teamService
      .edit(req.params.teamId, req.body);
  }

  @Validate()
  @Patch('/:teamId/name', [isTeamAdmin])
  public async updateName (@Body(UpdateTeamNameBodyDto) req : IRequest) {
    return await this.teamService
      .editName(req.params.teamId, req.body.name);
  }

  @Validate()
  @Patch('/:teamId/description', [isTeamAdmin])
  public async updateDescription (@Body(UpdateTeamDescriptionBodyDto) req : IRequest) {
    return await this.teamService
      .editDescription(req.params.teamId, req.body.description);
  }

  @Validate()
  @Patch('/:teamId/admins', [isTeamAdmin])
  public async updateAdmins (@Body(UpdateTeamAdminsBodyDto) req : IRequest) {
    return await this.teamService
      .editAdmins(req.params.teamId, req.body.admins);
  }

  @Validate()
  @Patch('/:teamId/members', [isTeamAdmin])
  public async updateMembers (@Body(UpdateTeamMembersBodyDto) req : IRequest) {
    return await this.teamService
      .editMembers(req.params.teamId, req.body.members);
  }

  @Patch('/:teamId/admins/self', [isTeamAdmin])
  public async selfAdminLeave (req : IRequest) {
    return await this.teamService
      .editAdmins(req.params.teamId, [req.account.id]);
  }

  @Patch('/:teamId/members/self', [isTeamMember])
  public async selfMemberLeave (req : IRequest) {
    return await this.teamService
      .editMembers(req.params.teamId, [req.account.id]);
  }

  @Delete('/:teamId', [isTeamAdmin, confirmPassword])
  public async delete (req : IRequest) {
    return await this.teamService
      .remove(req.params.teamId, req.account.id);
  }

}