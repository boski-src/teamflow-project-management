import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AuthModule } from './auth';
import { WorkspaceModule } from './workspace';
import { HomeModule } from './home';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorModule } from './error';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    WorkspaceModule,
    HomeModule,
    ErrorModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
