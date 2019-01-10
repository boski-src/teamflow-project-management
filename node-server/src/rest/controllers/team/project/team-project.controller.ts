import {
  Body,
  Controller,
  Delete,
  Get,
  IRequest,
  Patch,
  Post,
  Put,
  Query,
  Validate
} from 'express-server-decorators';

import { checkProjectExists, checkTeamExists } from '../../../rest.middlewares';
import { hasTeamAccess, isAuth, isTeamAdmin } from '../../../rest.guards';

import {
  CheckProjectListLimitQueryDto,
  CreateProjectBodyDto,
  UpdateProjectBodyDto,
  UpdateProjectDeadlineBodyDto,
  UpdateProjectDescriptionBodyDto,
  UpdateProjectFinishedBodyDto,
  UpdateProjectNameBodyDto
} from './dtos';

import { TeamProjectService } from './team-project.service';

@Controller('/teams/:teamId/projects', {
  guards: [isAuth, hasTeamAccess],
  params: [
    { name: 'teamId', handler: checkTeamExists },
    { name: 'projectId', handler: checkProjectExists }
  ]
})
export class TeamProjectController {

  private projectService : TeamProjectService;

  constructor () {
    this.projectService = new TeamProjectService();
  }

  @Validate()
  @Post('/', [isTeamAdmin])
  public async create (@Body(CreateProjectBodyDto) req : IRequest) {
    return await this.projectService
      .insert(req.account.id, req.params.teamId, req.body);
  }

  @Get('/')
  public async showAllTeam (req : IRequest) {
    return await this.projectService
      .getBelongTeam(req.params.teamId);
  }

  @Validate()
  @Get('/page')
  public async showAllTeamPaginate (@Query(CheckProjectListLimitQueryDto) req : IRequest) {
    return await this.projectService
      .getBelongTeamPaginate(req.params.teamId, Number(req.query.start), Number(req.query.limit));
  }

  @Get('/:projectId')
  public async show (req : IRequest) {
    return await this.projectService
      .getOne(req.params.projectId);
  }

  @Validate()
  @Put('/:projectId', [isTeamAdmin])
  public async update (@Body(UpdateProjectBodyDto) req : IRequest) {
    return await this.projectService
      .edit(req.params.projectId, req.body);
  }

  @Validate()
  @Patch('/:projectId/name', [isTeamAdmin])
  public async updateName (@Body(UpdateProjectNameBodyDto) req : IRequest) {
    return await this.projectService
      .editName(req.params.projectId, req.body.name);
  }

  @Validate()
  @Patch('/:projectId/description', [isTeamAdmin])
  public async updateDescription (@Body(UpdateProjectDescriptionBodyDto) req : IRequest) {
    return await this.projectService
      .editDescription(req.params.projectId, req.body.description);
  }

  @Validate()
  @Patch('/:projectId/deadline', [isTeamAdmin])
  public async updateDeadline (@Body(UpdateProjectDeadlineBodyDto) req : IRequest) {
    return await this.projectService
      .editDeadline(req.params.projectId, req.body.deadline);
  }

  @Validate()
  @Patch('/:projectId/finished', [isTeamAdmin])
  public async updateFinished (@Body(UpdateProjectFinishedBodyDto) req : IRequest) {
    return await this.projectService
      .editFinished(req.params.projectId, req.body.finished);
  }

  @Delete('/:projectId', [isTeamAdmin])
  public async delete (req : IRequest) {
    return await this.projectService
      .remove(req.params.projectId, req.account.id);
  }

}