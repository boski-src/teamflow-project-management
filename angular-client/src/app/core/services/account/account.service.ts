import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { UserAccount } from '../../models';
import { SessionService } from '../session/session.service';
import { AccountRepositoryService } from '../../repositories/account/account-repository.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountDataSubject : BehaviorSubject<UserAccount> = new BehaviorSubject<UserAccount>({} as UserAccount);
  public accountData$ : Observable<UserAccount> = this.accountDataSubject.asObservable();

  public version = 0;

  constructor (private sessionService : SessionService, private accountRepository : AccountRepositoryService) {
    sessionService.isLogged$.subscribe(value => {
      if (value) this.refresh();
      else this.accountDataSubject.next({} as UserAccount);
    });
  }

  public get () : UserAccount {
    return this.accountDataSubject.value;
  }

  public updateVersion () {
    this.version++;
  }

  public get avatar () : string {
    return `${environment.storageUrl}/avatars/${this.get().id}?v=${this.version}`;
  }

  public refresh () : void {
    this.accountRepository.getCurrent()
      .subscribe(data => this.accountDataSubject.next(data));
  }

}