import { Component, Input } from '@angular/core';

import { Project, Team } from '../../../core/models';

@Component({
  selector: 'app-project-item-box',
  templateUrl: './project-item-box.component.html'
})
export class ProjectItemBoxComponent {

  @Input() public workspace : Team;
  @Input() public project : Project;

  constructor () { }

}
