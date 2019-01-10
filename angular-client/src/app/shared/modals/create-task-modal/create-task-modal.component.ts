import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Project, Task, Team } from '../../../core/models';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html'
})
export class CreateTaskModalComponent {

  constructor (
    private router : Router,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
  ) { }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get project () : Project {
    return this.storeService.project;
  }

  public onCreated (data : Task) {
    this.toastrService.success('Task has been created.');
    this.activeModal.close(data);
  }

  public onError (error : any) {
    this.toastrService.warning('Error while creating new task, try again.');
  }

}
