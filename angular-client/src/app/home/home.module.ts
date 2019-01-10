import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FavoriteTeamPipe } from '../core/pipes';
import { SharedModule } from '../shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WorkspacesComponent } from './workspaces';
import { ProfileComponent } from './profile';

@NgModule({
  declarations: [
    FavoriteTeamPipe,
    HomeComponent,
    WorkspacesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class HomeModule {}
