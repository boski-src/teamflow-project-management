import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../../../../core/services';

@Component({
  selector: 'app-edit-password-tab',
  templateUrl: './edit-password-tab.component.html'
})
export class EditPasswordTabComponent {

  constructor (private toastrService : ToastrService, private sessionService : SessionService) { }

  public onUpdated (state : boolean) {
    this.toastrService.success('Password has been changed!');
    this.sessionService.destroy();
  }

  public onError (error : any) {
    this.toastrService.warning('Password confirmation is invalid.');
  }

}
