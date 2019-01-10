import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes : Routes = [
  {
    path: '',
    component: ErrorComponent,
    children: [
      { path: 'page-not-found', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {}
