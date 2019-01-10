import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Event, Project, Team } from '../../../core/models';

@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.component.html'
})
export class EditEventModalComponent {

  @Input() public workspace : Team = this.storeService.workspace;
  @Input() public project : Project = this.storeService.project;
  @Input() public event : Event = new Event({});

  constructor (
    private router : Router,
    public activeModal : NgbActiveModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
  ) { }

  public onUpdated (data : Event) {
    this.toastrService.success('Event has been created.');
    this.activeModal.close(data);
  }

  public onError (error : any) {
    this.toastrService.warning('Error while updating event, try again.');
  }

}
