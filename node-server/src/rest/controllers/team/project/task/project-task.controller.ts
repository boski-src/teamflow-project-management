import { Body, Controller, Delete, Get, IRequest, Post, Put, Validate } from 'express-server-decorators';

import { hasTeamAccess, isAuth } from '../../../../rest.guards';
import { checkProjectExists, checkTaskExists, checkTeamExists } from '../../../../rest.middlewares';

import { CreateTaskBodyDto, CreateTaskNoteBodyDto, UpdateTaskBodyDto } from './dtos';

import { ProjectTaskService } from './project-task.service';

@Controller('/teams/:teamId/projects/:projectId/tasks', {
  guards: [isAuth, hasTeamAccess],
  params: [
    { name: 'teamId', handler: checkTeamExists },
    { name: 'projectId', handler: checkProjectExists },
    { name: 'taskId', handler: checkTaskExists }
  ]
})
export class ProjectTaskController {

  private projectTaskService : ProjectTaskService;

  constructor () {
    this.projectTaskService = new ProjectTaskService();
  }

  @Validate()
  @Post('/')
  public async create (@Body(CreateTaskBodyDto) req : IRequest) {
    return await this.projectTaskService
      .insert(req.account.id, req.params.projectId, req.body);
  }

  @Get('/')
  public async showAllProject (req : IRequest) {
    return await this.projectTaskService
      .getBelongProject(req.params.projectId);
  }

  @Get('/:taskId')
  public async show (req : IRequest) {
    return await this.projectTaskService
      .getOne(req.params.taskId);
  }

  @Validate()
  @Put('/:taskId')
  public async update (@Body(UpdateTaskBodyDto) req : IRequest) {
    return await this.projectTaskService
      .edit(req.account.id, req.params.projectId, req.params.taskId, req.body);
  }

  @Delete('/:taskId')
  public async delete (req : IRequest) {
    return await this.projectTaskService
      .remove(req.params.taskId, req.account.id);
  }

  @Validate()
  @Post('/:taskId/notes')
  public async createNote (@Body(CreateTaskNoteBodyDto) req : IRequest) {
    return await this.projectTaskService
      .insertNote(req.account.id, req.params.projectId, req.params.taskId, req.body.body);
  }

  @Get('/:taskId/notes')
  public async showNotes (req : IRequest) {
    return await this.projectTaskService
      .getNotesBelongTask(req.params.taskId);
  }

  @Delete('/:taskId/notes/:noteId')
  public async deleteNote (req : IRequest) {
    return await this.projectTaskService
      .removeNote(req.params.projectId, req.params.taskId, req.params.noteId);
  }

}