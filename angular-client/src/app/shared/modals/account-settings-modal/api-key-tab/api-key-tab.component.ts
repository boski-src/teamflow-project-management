import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-api-key-tab',
  templateUrl: './api-key-tab.component.html'
})
export class ApiKeyTabComponent {

  constructor (private toastrService : ToastrService) { }

  public onUpdated (apikey : string) {
    this.toastrService.success('Api key has been updated.');
  }

  public onError (error : any) {
    this.toastrService.warning('Error while updating, api key didn\'t change.');
  }

}
