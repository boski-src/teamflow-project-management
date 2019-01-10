import { Component } from '@angular/core';

import { StoreService } from '../../../core/services';
import { Project, Team } from '../../../core/models';

@Component({
  selector: 'app-project-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  public detailsCollapsed : boolean = false;

  constructor (private storeService : StoreService) { }

  public get pages () : string[] {
    return [this.workspace.name, 'Project', this.project.name];
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get project () : Project {
    return this.storeService.project;
  }

  public get roles () : any {
    return this.storeService.roles;
  }

}
