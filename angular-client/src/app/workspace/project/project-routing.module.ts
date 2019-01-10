import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details';
import { TasksComponent } from './tasks';
import { EventsComponent } from './events';

const routes : Routes = [
  {
    path: '',
    component: DetailsComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'events',
    component: EventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
