import { Component, Input } from '@angular/core';

import { Team } from '../../../core/models';
import { LocalStorageService } from '../../../core/services';

@Component({
  selector: 'app-workspace-item-box',
  templateUrl: './workspace-item-box.component.html'
})
export class WorkspaceItemBoxComponent {

  @Input() public workspace : Team;

  constructor (private localStorageService : LocalStorageService) { }

  public get isFavorite () : boolean {
    return !!this.localStorageService.teams.find(t => t === <any>this.workspace.id);
  }

  public pin () : void {
    this.localStorageService.pushToTeams(this.workspace.id);
  }

  public unpin () : void {
    this.localStorageService.spliceTeams([this.workspace.id]);
  }

}
