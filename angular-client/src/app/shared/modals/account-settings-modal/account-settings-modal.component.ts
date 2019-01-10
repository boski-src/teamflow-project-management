import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-settings-modal',
  templateUrl: './account-settings-modal.component.html'
})
export class AccountSettingsModalComponent {

  constructor (public activeModal : NgbActiveModal) { }

}
