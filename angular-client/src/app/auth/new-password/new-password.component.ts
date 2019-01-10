import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { RecoveryRepositoryService } from '../../core/repositories';
import { TitleService } from '../../core/services';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html'
})
export class NewPasswordComponent implements OnInit {

  public email : string;

  constructor (
    private router : Router,
    private route : ActivatedRoute,
    private titleService : TitleService,
    private recoveryRepository : RecoveryRepositoryService
  ) { }

  public get param () : ParamMap {
    return this.route.snapshot.paramMap;
  }

  public get token () : string {
    return this.param.get('token');
  }

  public get user () : string {
    return this.param.get('userId');
  }

  public ngOnInit () {
    this.titleService.title = ['Auth', 'Set New Password'];
    this.recoveryRepository.validToken(this.user, this.token)
      .subscribe(
        data => this.email = data,
        () => {
          this.router.navigate(['auth', 'request-password']);
        }
      );
  }

}
