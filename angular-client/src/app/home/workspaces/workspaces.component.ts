import { Component } from '@angular/core';

import { StoreService } from '../../core/services';
import { Team } from '../../core/models';

@Component({
  selector: 'app-home-workspaces',
  templateUrl: './workspaces.component.html'
})
export class WorkspacesComponent {

  public isCollapsed : boolean = true;

  constructor (private storeService : StoreService) { }

  public get workspaces () : Team[] {
    return this.storeService.workspaces;
  }

}
