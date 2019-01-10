import { Component } from '@angular/core';

import { meta } from '../../environments/meta';
import { SessionService } from '../core/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor (private sessionService : SessionService) {
    sessionService.destroy(false);
  }

  public get meta () : any {
    return meta;
  }

}
