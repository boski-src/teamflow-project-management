import { Types } from 'mongoose';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Chat, ChatMessage, Team, UserAccount } from '../../../core/models';
import { AccountService, StoreService, TitleService } from '../../../core/services';
import { ChatRepositoryService } from '../../../core/repositories';
import {
  CHAT_MESSAGE_CREATED,
  CHAT_MESSAGE_CREATED_SUBSCRIPTION
} from '../../../core/graphql';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('chatBox') public chatBox : ElementRef;
  public messages : ChatMessage[];
  private chatMessageCreatedSubscription : Subscription = new Subscription();
  private chatSubscription : Subscription = new Subscription();

  constructor (
    private storeService : StoreService,
    private chatRepository : ChatRepositoryService,
    private formBuilder : FormBuilder,
    private apollo : Apollo,
    private accountService : AccountService
  ) { }

  private messageControl : FormControl = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(800)
  ]);

  public get pages () : string[] {
    return [this.workspace.name, 'Chat', this.chat.name, 'Messages'];
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get chat () : Chat {
    return this.storeService.chat;
  }

  public get roles () : any {
    return this.storeService.roles;
  }

  public get account () : UserAccount {
    return this.accountService.get();
  }

  public get controlValid () : boolean {
    return this.messageControl.valid && this.messageControl.value.trim().length > 0;
  }

  public subscribeToMessageCreated (workspaceId : Types.ObjectId, chatId : Types.ObjectId) : void {
    this.chatMessageCreatedSubscription = this.apollo.subscribe({
      query: CHAT_MESSAGE_CREATED_SUBSCRIPTION,
      variables: {
        teamId: workspaceId,
        chatId
      }
    })
      .subscribe(({ data }) => {
        const created = data[CHAT_MESSAGE_CREATED];
        if (created.invoker.id !== this.account.id) {
          this.messages.push(new ChatMessage(created));
        }
      });
  }

  public loadMessages (workspaceId, chatId) : void {
    this.chatRepository.getMessages(workspaceId, chatId, '300')
      .subscribe(data => this.messages = data);
  }

  public sendMessage () : void {
    if (this.controlValid) {
      this.chatRepository.createMessage(this.workspace.id, this.chat.id, this.messageControl.value)
        .subscribe(data => {
          this.messageControl.reset();
          this.messages.push(data);
          this.scrollBottom();
        });
    }
  }

  public scrollTop () : void {
    this.chatBox.nativeElement.scrollTop = 0;
  }

  public scrollBottom () : void {
    this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
  }

  public ngOnInit () {
    this.ngOnDestroy();
    this.chatSubscription = this.storeService.chat$
      .subscribe((chat : Chat) => {
        if (chat.id) {
          this.loadMessages(this.workspace.id, chat.id);
          this.subscribeToMessageCreated(this.workspace.id, chat.id);
        }
      });
    this.scrollBottom();
  }

  public ngAfterViewChecked () {
    this.scrollBottom();
  }

  public ngOnDestroy () {
    this.chatSubscription.unsubscribe();
    this.chatMessageCreatedSubscription.unsubscribe();
  }

}
