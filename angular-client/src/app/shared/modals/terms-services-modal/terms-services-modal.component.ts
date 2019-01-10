import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terms-services-modal',
  templateUrl: './terms-services-modal.component.html'
})
export class TermsServicesModalComponent {

  constructor (public activeModal : NgbActiveModal) {}

}
