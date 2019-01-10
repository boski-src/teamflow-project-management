import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../core/services';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html'
})
export class RequestPasswordComponent implements OnInit {

  constructor (private titleService : TitleService) { }

  public ngOnInit () {
    this.titleService.title = ['Auth', 'Request Password'];
  }

}
