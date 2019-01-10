import { Component, OnInit } from '@angular/core';

import { AuthService, TitleService } from '../../core/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  constructor (private titleService : TitleService, private authService : AuthService) { }

  public facebook () : void {
    this.authService.facebookLogin();
  }

  public ngOnInit () {
    this.titleService.title = ['Auth', 'Sign In'];
  }

}
