import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { RecoveryRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html'
})
export class NewPasswordFormComponent {

  @Input() public email : string;
  @Input() public token : string;
  @Input() public user : string;

  public showPassword : boolean = false;

  constructor (
    private router : Router,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private recoveryRepository : RecoveryRepositoryService
  ) { }

  public passwordControl : FormControl = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  public submit () : void {
    if (this.passwordControl.valid) {
      this.recoveryRepository.updatePassword(this.user, this.token, this.passwordControl.value)
        .subscribe(
          () => {
            this.toastrService.success('Your password has been changed.', 'Success!');
            this.router.navigate(['auth', 'signin']);
          },
          () => {
            this.toastrService.error('Unknown error, please try again.', 'Wrong!');
          }
        );
    }
  }

}
