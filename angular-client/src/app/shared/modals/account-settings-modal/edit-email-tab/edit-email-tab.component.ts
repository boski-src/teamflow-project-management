import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { SessionService } from '../../../../core/services';

@Component({
  selector: 'app-edit-email-tab',
  templateUrl: './edit-email-tab.component.html'
})
export class EditEmailTabComponent {

  constructor (private toastrService : ToastrService, private sessionService : SessionService) { }

  public onUpdated (email : string) {
    this.toastrService.success('Email has been changed!');
    this.sessionService.destroy();
  }

  public onError (error : any) {
    this.toastrService.warning('Password confirmation is invalid.');
  }

}
