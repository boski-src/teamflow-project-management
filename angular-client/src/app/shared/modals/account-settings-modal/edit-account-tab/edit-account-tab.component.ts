import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../../../../core/services';
import { AccountRepositoryService } from '../../../../core/repositories';
import { UserProfile } from '../../../../core/models';

@Component({
  selector: 'app-edit-profile-tab',
  templateUrl: './edit-account-tab.component.html'
})
export class EditAccountTabComponent {

  public uploadingAvatar : boolean = false;

  constructor (
    private formBuilder : FormBuilder,
    private accountService : AccountService,
    private toastrService : ToastrService,
    private accountRepository : AccountRepositoryService
  ) {}

  private avatarControl : FormControl = this.formBuilder.control(null, [
    Validators.required
  ]);

  public get avatar () : string {
    return this.accountService.avatar;
  }

  public onProfileUpdated (data : UserProfile) {
    this.toastrService.success('Profile has been updated.');
  }

  public onProfileError () {
    this.toastrService.warning('Error while updating, profile didn\'t change.');
  }

  public onFileChange (files : any) : void {
    const fileReader : FileReader = new FileReader();

    if (files && files.length > 0) {
      let file = files[0];
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        let result : any = fileReader.result;
        this.avatarControl.setValue(result);
        this.uploadAvatar();
      };
    }
  }

  public uploadAvatar () : void {
    if (this.avatarControl.valid) {
      this.uploadingAvatar = true;
      this.accountRepository.uploadAvatar(this.avatarControl.value)
        .subscribe(
          () => this.toastrService.success('Avatar has been uploaded.'),
          () => this.toastrService.warning('Error while uploading, avatar didn\'t change.'),
        );

      setTimeout(() => {
        this.accountService.updateVersion();
        this.uploadingAvatar = false;
        this.avatarControl.setValue(null);
      }, 2000);
    }
  }

}
