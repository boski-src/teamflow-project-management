import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html'
})
export class SigninFormComponent {

  public showPassword : boolean = false;

  constructor (private formBuilder : FormBuilder, private authService : AuthService) { }

  private formData : FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  public get email () : AbstractControl {
    return this.formData.get('email');
  }

  public get password () : AbstractControl {
    return this.formData.get('password');
  }

  public submit () : void {
    if (this.formData.valid) this.authService.basicLogin(this.formData.value);
  }

}
