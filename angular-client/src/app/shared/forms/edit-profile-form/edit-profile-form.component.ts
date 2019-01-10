import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AccountRepositoryService } from '../../../core/repositories';
import { Error, UserProfile } from '../../../core/models';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html'
})
export class EditProfileFormComponent implements OnInit {

  @Output() public updated : EventEmitter<UserProfile> = new EventEmitter<UserProfile>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private accountRepository : AccountRepositoryService
  ) { }

  private profileForm : FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    title: ['', Validators.maxLength(256)],
    about: ['', Validators.maxLength(2500)],
    community: this.formBuilder.array([], Validators.maxLength(20))
  });

  public get fullName () : AbstractControl {
    return this.profileForm.get('fullName');
  }

  public get title () : AbstractControl {
    return this.profileForm.get('title');
  }

  public get about () : AbstractControl {
    return this.profileForm.get('about');
  }

  public get community () : AbstractControl {
    return this.profileForm.get('community');
  }

  public get links () : AbstractControl[] {
    return (this.profileForm.get('community') as FormArray).controls;
  }

  public addField (platform? : string, url? : string) : void {
    (this.profileForm.get('community') as FormArray).push(
      this.formBuilder.group({
        platform: [platform || '', [Validators.required]],
        url: [url || '', [Validators.required, CustomValidators.url]]
      })
    );
  }

  public removeField (index : number) : void {
    (this.profileForm.get('community') as FormArray).removeAt(index);
  }

  public ngOnInit () {
    this.accountRepository.getProfile()
      .subscribe(data => {
        this.profileForm.patchValue({
          fullName: data.fullName || '',
          title: data.title || '',
          about: data.about || '',
        });

        if (!data.community)
          this.addField();
        else
          data.community.forEach(social => this.addField(social.platform, social.url));
      });
  }

  public submit () : void {
    if (this.profileForm.valid) {
      this.accountRepository.updateProfile(this.profileForm.value)
        .subscribe(
          data => this.updated.emit(data),
          ({ error }) => this.error.emit(new Error(error.error.data))
        );
    }
  }

}
