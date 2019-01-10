import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { WorkspacesComponent } from './workspaces';
import { ProfileComponent } from './profile';

const routes : Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: WorkspacesComponent },
      { path: 'profile/:userId', component: ProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
