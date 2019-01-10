import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GraphQLModule } from './graphql';
import { ApiUrlInterceptor, AuthTokenInterceptor } from './interceptors';
import { HttpErrorHandler } from './handlers';
import {
  AccountRepositoryService,
  AuthRepositoryService,
  RecoveryRepositoryService,
  UserRepositoryService,
  TeamRepositoryService,
  ChatRepositoryService,
  ProjectRepositoryService,
  TaskRepositoryService,
  EventRepositoryService,
} from './repositories';
import {
  AccountService,
  AuthService,
  LocalStorageService,
  SessionService,
  StoreService,
  TitleService
} from './services';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    GraphQLModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger',
      inputClass: 'form-control'
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: HttpErrorHandler
    },
    GraphQLModule,
    // Repositories
    AccountRepositoryService,
    AuthRepositoryService,
    RecoveryRepositoryService,
    UserRepositoryService,
    TeamRepositoryService,
    ChatRepositoryService,
    ProjectRepositoryService,
    TaskRepositoryService,
    EventRepositoryService,
    // Services
    SessionService,
    LocalStorageService,
    AuthService,
    AccountService,
    StoreService,
    TitleService
  ]
})
export class CoreModule {}
