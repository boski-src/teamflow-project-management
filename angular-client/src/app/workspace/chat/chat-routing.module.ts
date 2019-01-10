import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details';
import { MessagesComponent } from './messages';

const routes : Routes = [
  {
    path: '',
    component: DetailsComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
