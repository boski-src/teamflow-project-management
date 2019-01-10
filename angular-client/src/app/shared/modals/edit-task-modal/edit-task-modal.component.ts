import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Project, Task, Team } from '../../../core/models';
import { StoreService } from '../../../core/services';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html'
})
export class EditTaskModalComponent {

  @Input() public workspace : Team = this.storeService.workspace;
  @Input() public project : Project = this.storeService.project;
  @Input() public task : Task = new Task({});

  constructor (
    public formBuilder : FormBuilder,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService
  ) { }

  public onUpdated (data : Task) {
    this.toastrService.success('Task has been updated.');
    this.activeModal.close(data);
  }

  public onError (error : any) {
    this.toastrService.warning('Error while updating task, try again.');
  }

}
