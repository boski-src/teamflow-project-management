import { map } from 'rxjs/operators';
import { Types } from 'mongoose';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Chat, ChatMessage, User } from '../../models';
import { AccountService } from '../../services/account/account.service';

import { IChatRepositoryService } from './chat-repository.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatRepositoryService implements IChatRepositoryService {

  private ENDPOINT = (teamId : Types.ObjectId) => `/teams/${teamId}/chats`;
  private ENDPOINT_CHAT = (teamId : Types.ObjectId, chatId : string) => `/teams/${teamId}/chats/${chatId}`;

  constructor (private httpClient : HttpClient, private accountService : AccountService) { }

  public get account () {
    return this.accountService.get();
  }

  public create (teamId, data) {
    return this.httpClient.post(this.ENDPOINT(teamId), data)
      .pipe<Chat>(
        map<any, Chat>(({ data }) => {
          data.manager = new User(this.account.serialize());
          return new Chat(data);
        })
      );
  }

  public createMessage (teamId, chatId, text) {
    return this.httpClient.post(`${this.ENDPOINT_CHAT(teamId, chatId)}/messages`, { text })
      .pipe<ChatMessage>(
        map<any, ChatMessage>(({ data }) => {
          data.invoker = new User(this.account.serialize());
          return new ChatMessage(data);
        })
      );
  }

  public getAll (teamId) {
    return this.httpClient.get(this.ENDPOINT(teamId))
      .pipe<Chat[]>(
        map<any, Chat[]>(({ data }) => data.map(chat => new Chat(chat)))
      );
  }

  public getAllPaging (teamId, start, limit) {
    return this.httpClient.get(this.ENDPOINT(teamId), { params: { start, limit } })
      .pipe<Chat[]>(
        map<any, Chat[]>(({ data }) => data.map(chat => new Chat(chat)))
      );
  }

  public get (teamId, chatId) {
    return this.httpClient.get(this.ENDPOINT_CHAT(teamId, chatId))
      .pipe<Chat>(
        map<any, Chat>(({ data }) => {
          data.manager = new User(data.manager);
          return new Chat(data);
        })
      );
  }

  public getMessages (teamId, chatId, limit = '300') {
    return this.httpClient.get(
      `${this.ENDPOINT_CHAT(teamId, chatId)}/messages`,
      { params: { limit } }
    )
      .pipe<ChatMessage[]>(
        map<any, ChatMessage[]>(({ data }) => data.map(message => {
          message.invoker = new User(message.invoker);
          return new ChatMessage(message);
        }))
      );
  }

  public update (teamId, chatId, data) {
    return this.httpClient.put(this.ENDPOINT_CHAT(teamId, chatId), data)
      .pipe<Chat>(
        map<any, Chat>(({ data }) => new Chat(data))
      );
  }

  public updateName (teamId, chatId, name) {
    return this.httpClient.patch(this.ENDPOINT_CHAT(teamId, chatId), { name })
      .pipe<Chat>(
        map<any, Chat>(({ data }) => new Chat(data))
      );
  }

  public updateDesc (teamId, chatId, description) {
    return this.httpClient.patch(this.ENDPOINT_CHAT(teamId, chatId), { description })
      .pipe<Chat>(
        map<any, Chat>(({ data }) => new Chat(data))
      );
  }

  public delete (teamId, chatId) {
    return this.httpClient.delete(this.ENDPOINT_CHAT(teamId, chatId))
      .pipe<Chat>(
        map<any, Chat>(({ data }) => new Chat(data))
      );
  }

}
