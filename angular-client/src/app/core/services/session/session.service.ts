import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isLoggedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogged$ : Observable<boolean> = this.isLoggedSubject.asObservable();

  constructor (
    private router : Router,
    private toastrService : ToastrService,
    private localStorageService : LocalStorageService
  ) {
    if (localStorageService.token) this.set(localStorageService.token, false);
  }

  public get logged () : boolean {
    return this.isLoggedSubject.value;
  }

  public set (token : string, redirect : boolean = true) : void {
    this.localStorageService.token = token;
    this.isLoggedSubject.next(true);
    if (redirect) {
      this.toastrService.success('Successfully logged.', 'Welcome');
      this.router.navigate(['']);
    }
  }

  public destroy (redirect : boolean = true) : void {
    this.localStorageService.removeToken();
    this.isLoggedSubject.next(false);
    if (redirect) {
      this.toastrService.error('Session destroyed.', 'Bye');
      this.router.navigate(['auth', 'signin']);
    }
  }

}
