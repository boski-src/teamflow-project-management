import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AccountRepositoryService } from '../../../core/repositories';
import { AccountService, SessionService } from '../../../core/services';
import { Error } from '../../../core/models';

@Component({
  selector: 'app-edit-email-form',
  templateUrl: './edit-email-form.component.html'
})
export class EditEmailFormComponent {

  @Output() public updated : EventEmitter<string> = new EventEmitter<string>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private accountService : AccountService,
    private sessionService : SessionService,
    private accountRepository : AccountRepositoryService
  ) { }

  private emailControl : FormControl = this.formBuilder.control(this.currentEmail, [
    Validators.required,
    Validators.email
  ]);

  public get currentEmail () : string {
    return this.accountService.get().email;
  }

  public get valid () : boolean {
    return this.emailControl.valid && this.currentEmail !== this.emailControl.value;
  }

  public submit (password : string) : void {
    if (this.valid && password) {
      this.accountRepository.updateEmail(this.emailControl.value, password)
        .subscribe(
          data => this.updated.emit(data),
          ({ error }) => this.error.emit(new Error(error.error.data))
        );
    }
  }

}
