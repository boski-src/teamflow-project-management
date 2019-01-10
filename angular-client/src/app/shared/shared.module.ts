import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import {
  LayoutComponent,
  NavbarComponent,
  SidebarComponent,
  PageTitleComponent,
  WorkspaceNavbarComponent,
  ProjectNavbarComponent,
  ChatNavbarComponent,
  PageBreadcrumbComponent
} from './layout';
import {
  ChatItemBoxComponent,
  ProjectItemBoxComponent,
  UserItemBoxComponent,
  WorkspaceItemBoxComponent,
  MessageItemBoxComponent
} from './boxes';
import {
  TermsServicesModalComponent,
  AccountSettingsModalComponent,
  EditAccountTabComponent,
  EditEmailTabComponent,
  EditPasswordTabComponent,
  ApiKeyTabComponent,
  LoginHistoryModalComponent,
  CreateWorkspaceModalComponent,
  EditWorkspaceModalComponent,
  CreateProjectModalComponent,
  CreateChatModalComponent,
  EditProjectModalComponent,
  EditChatModalComponent,
  CreateTaskModalComponent,
  ViewTaskModalComponent,
  EditTaskModalComponent, CreateEventModalComponent, ViewEventModalComponent, EditEventModalComponent
} from './modals';
import {
  EditProfileFormComponent,
  EditEmailFormComponent,
  EditPasswordFormComponent,
  UpdateApiKeyFormComponent,
  CreateWorkspaceFormComponent,
  EditWorkspaceFormComponent,
  CreateProjectFormComponent,
  CreateChatFormComponent,
  EditProjectFormComponent,
  EditChatFormComponent,
  CreateTaskFormComponent,
  EditTaskFormComponent, CreateEventFormComponent, EditEventFormComponent
} from './forms';

@NgModule({
  declarations: [
    /* Layout */
    NavbarComponent,
    SidebarComponent,
    PageTitleComponent,
    PageBreadcrumbComponent,
    LayoutComponent,
    WorkspaceNavbarComponent,
    ProjectNavbarComponent,
    ChatNavbarComponent,
    /* Boxes */
    WorkspaceItemBoxComponent,
    ProjectItemBoxComponent,
    ChatItemBoxComponent,
    UserItemBoxComponent,
    MessageItemBoxComponent,
    /* Models */
    TermsServicesModalComponent,
    AccountSettingsModalComponent,
    LoginHistoryModalComponent,
    CreateWorkspaceModalComponent,
    EditWorkspaceModalComponent,
    CreateProjectModalComponent,
    EditProjectModalComponent,
    CreateChatModalComponent,
    EditChatModalComponent,
    CreateTaskModalComponent,
    ViewTaskModalComponent,
    EditTaskModalComponent,
    CreateEventModalComponent,
    ViewEventModalComponent,
    EditEventModalComponent,
    /* Forms */
    EditProfileFormComponent,
    EditEmailFormComponent,
    UpdateApiKeyFormComponent,
    EditPasswordFormComponent,
    CreateWorkspaceFormComponent,
    EditWorkspaceFormComponent,
    CreateProjectFormComponent,
    EditProjectFormComponent,
    CreateChatFormComponent,
    EditChatFormComponent,
    CreateTaskFormComponent,
    EditTaskFormComponent,
    CreateEventFormComponent,
    EditEventFormComponent,
    /* Others*/
    EditAccountTabComponent,
    EditEmailTabComponent,
    EditPasswordTabComponent,
    ApiKeyTabComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgbModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  exports: [
    /* Layout */
    NavbarComponent,
    SidebarComponent,
    PageTitleComponent,
    PageBreadcrumbComponent,
    LayoutComponent,
    WorkspaceNavbarComponent,
    ProjectNavbarComponent,
    ChatNavbarComponent,
    /* Boxes */
    WorkspaceItemBoxComponent,
    ProjectItemBoxComponent,
    ChatItemBoxComponent,
    UserItemBoxComponent,
    MessageItemBoxComponent,
    /* Models */
    TermsServicesModalComponent,
    AccountSettingsModalComponent,
    LoginHistoryModalComponent,
    CreateWorkspaceModalComponent,
    EditWorkspaceModalComponent,
    CreateProjectModalComponent,
    EditProjectModalComponent,
    CreateChatModalComponent,
    EditChatModalComponent,
    CreateTaskModalComponent,
    ViewTaskModalComponent,
    EditTaskModalComponent,
    CreateEventModalComponent,
    ViewEventModalComponent,
    EditEventModalComponent,
    /* Forms */
    EditProfileFormComponent,
    EditEmailFormComponent,
    UpdateApiKeyFormComponent,
    EditPasswordFormComponent,
    CreateWorkspaceFormComponent,
    EditWorkspaceFormComponent,
    CreateProjectFormComponent,
    CreateChatFormComponent,
    EditProjectFormComponent,
    CreateTaskFormComponent,
    EditTaskFormComponent,
    CreateEventFormComponent,
    EditEventFormComponent,
    /* Others*/
    EditAccountTabComponent,
    EditEmailTabComponent,
    EditPasswordTabComponent,
    ApiKeyTabComponent
  ],
  entryComponents: [
    TermsServicesModalComponent,
    AccountSettingsModalComponent,
    LoginHistoryModalComponent,
    CreateWorkspaceModalComponent,
    EditWorkspaceModalComponent,
    CreateProjectModalComponent,
    EditProjectModalComponent,
    CreateChatModalComponent,
    EditChatModalComponent,
    CreateTaskModalComponent,
    ViewTaskModalComponent,
    EditTaskModalComponent,
    CreateEventModalComponent,
    ViewEventModalComponent,
    EditEventModalComponent
  ]
})
export class SharedModule {}
