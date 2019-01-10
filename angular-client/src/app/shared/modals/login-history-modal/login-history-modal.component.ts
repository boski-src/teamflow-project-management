import { Component, OnInit, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserAuth } from '../../../core/models';
import { AccountRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-login-history-modal',
  templateUrl: './login-history-modal.component.html'
})
export class LoginHistoryModalComponent implements OnInit {

  public logins : UserAuth[];
  public loading : boolean = false;

  constructor (public activeModal : NgbActiveModal, private accountRepository : AccountRepositoryService) {}

  public ngOnInit () {
    this.loadAuthentications();
  }

  public loadAuthentications () : void {
    this.loading = true;
    this.accountRepository.getAuthentications()
      .subscribe(data => {
        this.logins = data;
        setTimeout(() => this.loading = false, 2000);
      });
  }

}
