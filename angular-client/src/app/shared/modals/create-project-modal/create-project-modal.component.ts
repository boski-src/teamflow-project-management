import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Project, Team } from '../../../core/models';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html'
})
export class CreateProjectModalComponent {

  @Input() public workspace : Team = this.storeService.workspace;

  constructor (
    private router : Router,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
  ) { }

  public onCreated (data : Project) {
    this.toastrService.success('Project has been created.');
    // this.storeService.projects.push(data);
    this.activeModal.close();
    this.router.navigate(['/', this.workspace.id, 'project', data.id]);
  }

  public onError (error : any) {
    this.toastrService.warning('Error while creating new project, try again.');
  }

}
