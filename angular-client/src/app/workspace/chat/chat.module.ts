import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared';

import { ChatRoutingModule } from './chat-routing.module';
import { DetailsComponent } from './details';
import { MessagesComponent } from './messages';

@NgModule({
  declarations: [
    DetailsComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class ChatModule {}
