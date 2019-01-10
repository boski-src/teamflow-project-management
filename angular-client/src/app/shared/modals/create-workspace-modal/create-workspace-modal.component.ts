import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Team } from '../../../core/models';

@Component({
  selector: 'app-create-workspace-modal',
  templateUrl: './create-workspace-modal.component.html'
})
export class CreateWorkspaceModalComponent {

  constructor (
    private router : Router,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
  ) { }

  public onCreated (data : Team) {
    this.toastrService.success('Workspace has been created.');
    this.storeService.workspaces.push(data);
    this.activeModal.close();
    this.router.navigate(['/', data.id]);
  }

  public onError (error : any) {
    this.toastrService.warning('Error while creating new team, try again.');
  }

}
