import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchByKeyPipe } from '../core/pipes';
import { SharedModule } from '../shared';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { OverviewComponent } from './overview';
import { ProjectsComponent } from './projects';
import { ChatsComponent } from './chats';
import { UsersComponent } from './users';
import { ChatComponent, ChatModule } from './chat';
import { ProjectComponent, ProjectModule } from './project';

@NgModule({
  declarations: [
    SearchByKeyPipe,
    WorkspaceComponent,
    OverviewComponent,
    ProjectsComponent,
    ChatsComponent,
    UsersComponent,
    ChatComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkspaceRoutingModule,
    SharedModule,
    NgbModule,
    ProjectModule,
    ChatModule
  ]
})
export class WorkspaceModule {}
