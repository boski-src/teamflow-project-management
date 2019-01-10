import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AccountRepositoryService } from '../../../core/repositories';
import { AccountService, SessionService } from '../../../core/services';
import { Error } from '../../../core/models';

@Component({
  selector: 'app-edit-password-form',
  templateUrl: './edit-password-form.component.html'
})
export class EditPasswordFormComponent {

  public showPassword : boolean = false;
  @Output() public updated : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private accountService : AccountService,
    private sessionService : SessionService,
    private accountRepository : AccountRepositoryService
  ) { }

  private passwordControl : FormControl = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  public get valid () : boolean {
    return this.passwordControl.valid;
  }

  public submit (password : string) : void {
    if (this.valid && password) {
      this.accountRepository.updatePassword(this.passwordControl.value, password)
        .subscribe(
          data => this.updated.emit(data),
          ({ error }) => this.error.emit(new Error(error.error.data))
        );
    }
  }

}
