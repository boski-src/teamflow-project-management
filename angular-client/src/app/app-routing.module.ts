import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards';

import { AuthModule } from './auth';
import { HomeModule } from './home';
import { WorkspaceModule } from './workspace';
import { ErrorModule } from './error';

const routes : Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () => HomeModule
  },
  {
    path: ':workspaceId',
    canLoad: [AuthGuard],
    loadChildren: () => WorkspaceModule
  },
  {
    path: 'error',
    loadChildren: () => ErrorModule
  },
  {
    path: '**',
    redirectTo: '/error/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
