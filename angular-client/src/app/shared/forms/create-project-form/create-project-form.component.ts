import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { Error, Project, Team } from '../../../core/models';
import { ProjectRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html'
})
export class CreateProjectFormComponent {

  @Input() public workspace : Team;
  @Output() public created : EventEmitter<Project> = new EventEmitter<Project>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (private formBuilder : FormBuilder, private projectRepository : ProjectRepositoryService) { }

  private formData : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(1500)]],
    deadline: [new Date().toISOString().substr(0, 10), [CustomValidators.date, CustomValidators.minDate(Date.now())]]
  });

  public get name () : AbstractControl {
    return this.formData.get('name');
  }

  public get description () : AbstractControl {
    return this.formData.get('description');
  }

  public get deadline () : AbstractControl {
    return this.formData.get('deadline');
  }

  public submit () : void {
    if (this.formData.valid) {
      this.formData.patchValue({
        deadline: new Date(this.deadline.value)
      });
      this.projectRepository.create(this.workspace.id, this.formData.value)
        .subscribe(
          data => {
            this.formData.reset();
            this.created.emit(data);
          },
          ({ error }) => this.error.emit(new Error(error.error.data))
        );
    }
  }

}
