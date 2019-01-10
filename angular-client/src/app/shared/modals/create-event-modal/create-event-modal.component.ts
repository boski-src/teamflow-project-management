import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../../core/services';
import { Event, Project, Team } from '../../../core/models';

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html'
})
export class CreateEventModalComponent {

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

  public onCreated (data : Event) {
    this.toastrService.success('Event has been created.');
    this.activeModal.close(data);
  }

  public onError (error : any) {
    this.toastrService.warning('Error while creating new event, try again.');
  }

}
