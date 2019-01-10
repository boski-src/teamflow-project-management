import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Team } from '../../../core/models';
import { EditWorkspaceModalComponent } from '../../modals';

@Component({
  selector: 'app-workspace-navbar',
  templateUrl: './workspace-navbar.component.html',
  styleUrls: ['./workspace-navbar.component.scss']
})
export class WorkspaceNavbarComponent {

  @Input() public workspace : Team;
  @Input() public roles : any;

  constructor (private modal : NgbModal) { }

  public openEditWorkspaceModal () : void {
    this.modal.open(EditWorkspaceModalComponent, { size: 'lg' });
  }

}
