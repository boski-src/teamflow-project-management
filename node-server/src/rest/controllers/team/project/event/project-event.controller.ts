import { Body, Controller, Delete, Get, IRequest, Post, Put, Validate } from 'express-server-decorators';

import { hasTeamAccess, isAuth } from '../../../../rest.guards';
import { checkEventExists, checkProjectExists, checkTeamExists } from '../../../../rest.middlewares';

import { CreateEventBodyDto, CreateEventNoteBodyDto, UpdateEventBodyDto } from './dtos';
import { ProjectEventService } from './project-event.service';

@Controller('/teams/:teamId/projects/:projectId/events', {
  guards: [isAuth, hasTeamAccess],
  params: [
    { name: 'teamId', handler: checkTeamExists },
    { name: 'projectId', handler: checkProjectExists },
    { name: 'eventId', handler: checkEventExists }
  ]
})
export class ProjectEventController {

  private projectEventService : ProjectEventService;

  constructor () {
    this.projectEventService = new ProjectEventService();
  }

  @Validate()
  @Post('/')
  public async create (@Body(CreateEventBodyDto) req : IRequest) {
    return await this.projectEventService
      .insert(req.account.id, req.params.projectId, req.body);
  }

  @Get('/')
  public async showAllProject (req : IRequest) {
    return await this.projectEventService
      .getBelongProject(req.params.projectId);
  }

  @Get('/:eventId')
  public async show (req : IRequest) {
    return await this.projectEventService
      .getOne(req.params.eventId);
  }

  @Validate()
  @Put('/:eventId')
  public async update (@Body(UpdateEventBodyDto) req : IRequest) {
    return await this.projectEventService
      .edit(req.account.id, req.params.projectId, req.params.eventId, req.body);
  }

  @Delete('/:eventId')
  public async delete (req : IRequest) {
    return await this.projectEventService
      .remove(req.params.eventId, req.account.id);
  }

  @Validate()
  @Post('/:eventId/notes')
  public async createNote (@Body(CreateEventNoteBodyDto) req : IRequest) {
    return await this.projectEventService
      .insertNote(req.account.id, req.params.projectId, req.params.eventId, req.body.body);
  }

  @Get('/:eventId/notes')
  public async showNotes (req : IRequest) {
    return await this.projectEventService
      .getNotesBelongEvent(req.params.eventId);
  }

  @Delete('/:eventId/notes/:noteId')
  public async deleteNote (req : IRequest) {
    return await this.projectEventService
      .removeNote(req.params.projectId, req.params.eventId, req.params.noteId);
  }

}