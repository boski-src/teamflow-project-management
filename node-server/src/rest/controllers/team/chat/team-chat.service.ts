import { Types } from 'mongoose';
import { Catch } from 'express-server-decorators';

import { ChatRepository, TeamRepository, MessageRepository } from '../../../../base';
import {
  IChatModel,
  IChatRepositoryCreateData,
  IChatRepositoryUpdateData,
  IChatSchema, IMessageModel, IMessageRepositoryCreateData, IMessageSchema
} from '../../../../common';

import { publish } from '../../../../graphql/pubsub';
import { CHAT_CREATED, CHAT_DELETED, CHAT_MESSAGE_CREATED, CHAT_UPDATED } from '../../../../graphql/constants';

export class TeamChatService {

  private teamRepository : TeamRepository;
  private chatRepository : ChatRepository;
  private messageRepository : MessageRepository;

  constructor () {
    this.teamRepository = new TeamRepository();
    this.chatRepository = new ChatRepository();
    this.messageRepository = new MessageRepository();
  }

  @Catch('An error occured while creating new chat.', 400)
  public async insert (userId, teamId, data : IChatRepositoryCreateData) : Promise<object> {
    let create : IChatRepositoryCreateData = {
      _team: teamId,
      name: data.name,
      description: data.description,
      manager: userId
    };

    let chat : IChatModel = await this.chatRepository.create(create);
    await this.teamRepository.updateProjects(teamId, chat.id);

    await publish(CHAT_CREATED, chat);

    return chat.formatDocument();
  }

  @Catch('An error occured while creating new chat\'s message.', 400)
  public async insertMessage (userId, chatId, body) : Promise<object> {
    let create : IMessageRepositoryCreateData = {
      _chat: chatId,
      invoker: userId,
      body
    };

    let message : IMessageModel = await this.messageRepository.create(create);
    await this.chatRepository.updateMessages(chatId, message.id);

    await publish(CHAT_MESSAGE_CREATED, message);

    return message.formatDocument();
  }

  @Catch('An error occured while receiving chat data.', 400)
  public async getOne (chatId) : Promise<IChatModel> {
    let select = {
      _team: 1,
      id: 1,
      name: 1,
      manager: 1,
      description: 1,
      createdAt: 1
    };
    let refs = [
      {
        path: 'manager',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    return await this.chatRepository.findById(chatId, select, refs);
  }

  @Catch('An error occured while receiving chat\'s messages data.')
  public async getMessagesBelongChat (chatId, limit = 300) : Promise<IMessageSchema[]> {
    let select = { updatedAt: 0 };
    let refs = [
      {
        path: 'invoker',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    return (
      await this.messageRepository
        .findBelongChat(chatId, select, { limit }, refs)
    ).reverse();
  }

  @Catch('An error occured while receiving list of team\'s chats.', 400)
  public async getBelongTeam (teamId) : Promise<IChatSchema[]> {
    let select = {
      _team: 1,
      id: 1,
      name: 1,
      description: 1,
      createdAt: 1,
      updatedAt: 1
    };
    return await this.chatRepository.findBelongTeam(teamId, select);
  }

  @Catch('An error occured while receiving list of team\'s chats.', 400)
  public async getBelongTeamPaginate (teamId, skip : number = 0, limit : number = 10) : Promise<IChatSchema[]> {
    let select = {
      _team: 1,
      id: 1,
      name: 1,
      description: 1,
      createdAt: 1,
      updatedAt: 1
    };
    return await this.chatRepository
      .findBelongTeam(teamId, select, { skip, limit });
  }

  @Catch('An error occured while updating chat.', 400)
  public async edit (chatId : Types.ObjectId, data : IChatRepositoryUpdateData) : Promise<object> {
    let updated : IChatModel = await this.chatRepository.update(chatId, {
      name: data.name,
      description: data.description
    });

    await publish(CHAT_UPDATED, updated);

    return updated.formatDocument(['id', 'name', 'description']);
  }

  @Catch('An error occured while updating chat name.', 400)
  public async editName (chatId : Types.ObjectId, newName : string) : Promise<object> {
    let updated : IChatModel = await this.chatRepository.updateName(chatId, newName);

    await publish(CHAT_UPDATED, updated);

    return updated.formatDocument(['id', 'name']);
  }

  @Catch('An error occured while updating chat description.', 400)
  public async editDescription (chatId : Types.ObjectId, newDescription : string) : Promise<object> {
    let updated : IChatModel = await this.chatRepository.updateDescription(chatId, newDescription);

    await publish(CHAT_UPDATED, updated);

    return updated.formatDocument(['id', 'description']);
  }

  @Catch('An error occured while deleting chat.', 400)
  public async remove (chatId, userId) : Promise<object> {
    let deleted : IChatModel = await this.chatRepository.delete(chatId, userId);

    await publish(CHAT_DELETED, deleted);

    return deleted.formatDocument(['id', 'name', 'deletedAt']);
  }

}