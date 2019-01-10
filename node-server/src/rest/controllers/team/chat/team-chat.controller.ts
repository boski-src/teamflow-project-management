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

import { hasTeamAccess, isAuth, isTeamAdmin } from '../../../rest.guards';
import { checkChatExists, checkTeamExists } from '../../../rest.middlewares';

import {
  CheckChatListLimitQueryDto,
  CreateChatBodyDto,
  CreateChatMessageBodyDto,
  UpdateChatBodyDto,
  UpdateChatDescriptionBodyDto,
  UpdateChatNameBodyDto
} from './dtos';

import { TeamChatService } from './team-chat.service';

@Controller('/teams/:teamId/chats', {
  guards: [isAuth, hasTeamAccess],
  params: [
    { name: 'teamId', handler: checkTeamExists },
    { name: 'chatId', handler: checkChatExists }
  ]
})
export class TeamChatController {

  private chatService : TeamChatService;

  constructor () {
    this.chatService = new TeamChatService();
  }

  @Validate()
  @Post('/', [isTeamAdmin])
  public async create (@Body(CreateChatBodyDto) req : IRequest) {
    return await this.chatService
      .insert(req.account.id, req.params.teamId, req.body);
  }

  @Get('/')
  public async showAllTeam (req : IRequest) {
    return await this.chatService
      .getBelongTeam(req.params.teamId);
  }

  @Validate()
  @Get('/page')
  public async showAllTeamPaginate (@Query(CheckChatListLimitQueryDto) req : IRequest) {
    return await this.chatService
      .getBelongTeamPaginate(req.params.teamId, Number(req.query.start), Number(req.query.limit));
  }

  @Get('/:chatId')
  public async show (req : IRequest) {
    return await this.chatService
      .getOne(req.params.chatId);
  }

  @Validate()
  @Put('/:chatId', [isTeamAdmin])
  public async update (@Body(UpdateChatBodyDto) req : IRequest) {
    return await this.chatService
      .edit(req.params.chatId, req.body);
  }

  @Validate()
  @Patch('/:chatId/name', [isTeamAdmin])
  public async updateName (@Body(UpdateChatNameBodyDto) req : IRequest) {
    return await this.chatService
      .editName(req.params.chatId, req.body.name);
  }

  @Validate()
  @Patch('/:chatId/description', [isTeamAdmin])
  public async updateDescription (@Body(UpdateChatDescriptionBodyDto) req : IRequest) {
    return await this.chatService
      .editDescription(req.params.chatId, req.body.description);
  }

  @Delete('/:chatId', [isTeamAdmin])
  public async delete (req : IRequest) {
    return await this.chatService
      .remove(req.params.chatId, req.account.id);
  }

  @Validate()
  @Post('/:chatId/messages')
  public async createMessage (@Body(CreateChatMessageBodyDto) req : IRequest) {
    return await this.chatService
      .insertMessage(req.account.id, req.params.chatId, req.body.text);
  }

  @Get('/:chatId/messages')
  public async showMessages (req : IRequest) {
    return await this.chatService
      .getMessagesBelongChat(req.params.chatId, Number(req.query.limit));
  }

}