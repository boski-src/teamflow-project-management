import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Team } from '../../../core/models';

@Component({
  selector: 'app-edit-workspace-modal',
  templateUrl: './edit-workspace-modal.component.html'
})
export class EditWorkspaceModalComponent {

  @Input() public workspace : Team = this.storeService.workspace;

  constructor (
    private router : Router,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
  ) { }

  public onUpdated (data : Team) {
    this.storeService.patchWorkspace(data.id, data);
    this.toastrService.success('Workspace has been updated.');
  }

  public onError (error : any) {
    this.toastrService.warning('Error while updating team, try again.');
  }

}
