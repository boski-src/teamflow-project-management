import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecoveryRepositoryService } from '../../../core/repositories';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-password-form',
  templateUrl: './request-password-form.component.html'
})
export class RequestPasswordFormComponent {

  constructor (
    private router : Router,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private recoveryRepository : RecoveryRepositoryService
  ) { }

  private formData : FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  public get email () : AbstractControl {
    return this.formData.get('email');
  }

  public submit () : void {
    if (this.formData.valid) {
      this.recoveryRepository.sendMail(this.formData.value.email)
        .subscribe(
          () => {
            this.toastrService.success('Check your email for more details.', 'Success!');
            this.router.navigate(['auth', 'signin']);
          },
          () => {
            this.toastrService.error('Your email no exists in our system.', 'Wrong!');
          }
        );
    }
  }

}
