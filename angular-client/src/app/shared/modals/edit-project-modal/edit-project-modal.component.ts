import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Project, Team } from '../../../core/models';

@Component({
  selector: 'app-edit-chat-modal',
  templateUrl: './edit-project-modal.component.html'
})
export class EditProjectModalComponent {

  @Input() public workspace : Team = this.storeService.workspace;
  @Input() public project : Project = this.storeService.project;

  constructor (
    private router : Router,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
  ) { }

  public onUpdated (data : Project) {
    this.storeService.patchProject(data.id, data);
    this.toastrService.success('Project has been updated.');
  }

  public onError (error : any) {
    this.toastrService.warning('Error while updating project, try again.');
  }

}
