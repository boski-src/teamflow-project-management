import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../core/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  constructor (private titleService : TitleService) { }

  public ngOnInit () {
    this.titleService.title = ['Auth', 'Sign Up'];
  }

}

