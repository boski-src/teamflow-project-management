import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { Error, Project, Team } from '../../../core/models';
import { ProjectRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html'
})
export class EditProjectFormComponent implements OnInit {

  @Input() public workspace : Team;
  @Input() public project : Project;
  @Output() public updated : EventEmitter<Project> = new EventEmitter<Project>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (private formBuilder : FormBuilder, private projectRepository : ProjectRepositoryService) { }

  private formData : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(1500)]],
    deadline: [null, [CustomValidators.date, CustomValidators.minDate(Date.now())]],
    finished: [null, [Validators.required]]
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

  public get finished () : AbstractControl {
    return this.formData.get('finished');
  }

  public submit () : void {
    if (this.formData.valid) {
      this.formData.patchValue({
        deadline: new Date(this.deadline.value)
      });
      this.projectRepository.update(this.workspace.id, this.project.id, this.formData.value)
        .subscribe(
          data => {
            this.updated.emit(data);
            this.ngOnInit();
          },
          ({ error }) => this.error.emit(new Error(error.error.data))
        );
    }
  }

  public ngOnInit () {
    this.formData.setValue({
      name: this.project.name,
      deadline: new Date(this.project.deadline).toISOString().substr(0, 10),
      description: this.project.description,
      finished: this.project.finished
    });
  }

}
