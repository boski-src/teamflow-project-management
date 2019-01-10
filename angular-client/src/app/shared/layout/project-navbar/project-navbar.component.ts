import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Project, Team } from '../../../core/models';
import { EditProjectModalComponent } from '../../modals';

@Component({
  selector: 'app-project-navbar',
  templateUrl: './project-navbar.component.html',
  styleUrls: ['./project-navbar.component.scss']
})
export class ProjectNavbarComponent {

  @Input() public workspace : Team;
  @Input() public project : Project;
  @Input() public roles : any;

  constructor (private modal : NgbModal) { }

  public openEditProjectModal () : void {
    this.modal.open(EditProjectModalComponent, { size: 'lg' });
  }

}
