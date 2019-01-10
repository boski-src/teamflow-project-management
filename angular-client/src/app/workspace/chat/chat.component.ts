import { Types } from 'mongoose';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { StoreService } from '../../core/services';
import { Chat, Message, Team } from '../../core/models';
import { CHAT_UPDATED, CHAT_UPDATED_SUBSCRIPTION } from '../../core/graphql';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {

  public messages : Message[] = [];
  private workspaceSubscription : Subscription = new Subscription();
  private chatUpdatedSubscription : Subscription = new Subscription();
  private chatSubscription : Subscription = new Subscription();

  constructor (
    private route : ActivatedRoute,
    private apollo : Apollo,
    private storeService : StoreService
  ) { }

  public get chat () : Chat {
    return this.storeService.chat;
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public subscribeToChatUpdated (workspaceId : Types.ObjectId, chatId : Types.ObjectId) : void {
    this.chatUpdatedSubscription = this.apollo.subscribe({
      query: CHAT_UPDATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        chatId
      }
    })
      .subscribe(({ data }) => {
        const updated = data[CHAT_UPDATED];
        this.storeService.patchChat(updated.id, updated);
      });
  }

  public ngOnInit () {
    this.route.params.subscribe((params : Params) => {
      this.ngOnDestroy();
      this.workspaceSubscription = this.storeService.workspace$
        .subscribe((workspace : Team) => {
          if (workspace.id) this.storeService.fetchChat(workspace.id, params.chatId);
        });
      this.chatSubscription = this.storeService.chat$
        .subscribe((chat : Chat) => {
          if (chat.id) this.subscribeToChatUpdated(this.workspace.id, chat.id);
        });
    });
  }

  public ngOnDestroy () {
    this.workspaceSubscription.unsubscribe();
    this.chatSubscription.unsubscribe();
    this.chatUpdatedSubscription.unsubscribe();
    this.storeService.resetChat();
  }

}
