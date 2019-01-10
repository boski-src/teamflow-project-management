import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../core/services';
import { TermsServicesModalComponent } from '../../../shared/modals';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html'
})
export class SignupFormComponent {

  public showPassword : boolean = false;

  constructor (
    private formBuilder : FormBuilder,
    private modal : NgbModal,
    private authService : AuthService
  ) { }

  private formData : FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    termsAccept: [false, [Validators.required, Validators.pattern('true')]]
  });

  public get firstName () : AbstractControl {
    return this.formData.get('firstName');
  }

  public get lastName () : AbstractControl {
    return this.formData.get('lastName');
  }

  public get email () : AbstractControl {
    return this.formData.get('email');
  }

  public get password () : AbstractControl {
    return this.formData.get('password');
  }

  public get termsAccept () : AbstractControl {
    return this.formData.get('termsAccept');
  }

  public submit () : void {
    if (this.formData.valid) this.authService.basicCreate(this.formData.value);
  }

  public openTermsModal () : void {
    this.modal.open(TermsServicesModalComponent, { size: 'lg' });
  }

}
