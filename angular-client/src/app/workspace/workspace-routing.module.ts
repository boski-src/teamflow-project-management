import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatModule, ChatComponent } from './chat';
import { ProjectComponent, ProjectModule } from './project';

import { WorkspaceComponent } from './workspace.component';
import { OverviewComponent } from './overview';
import { ProjectsComponent } from './projects';
import { ChatsComponent } from './chats';
import { UsersComponent } from './users';

const routes : Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'chats',
        component: ChatsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'chat/:chatId',
        component: ChatComponent,
        loadChildren: () => ChatModule
      },
      {
        path: 'project/:projectId',
        component: ProjectComponent,
        loadChildren: () => ProjectModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {}
