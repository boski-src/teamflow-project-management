import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { Error, Project, Task, Team } from '../../../core/models';
import { TaskRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html'
})
export class EditTaskFormComponent implements OnInit {

  @Input() public workspace : Team;
  @Input() public project : Project;
  @Input() public task : Task;
  @Output() public updated : EventEmitter<Task> = new EventEmitter<Task>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (private formBuilder : FormBuilder, private taskRepository : TaskRepositoryService) { }

  private formData : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(1000)]],
    priority: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
    state: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    due: [new Date().toISOString().substr(0, 10), [CustomValidators.date, CustomValidators.minDate(Date.now())]]
  });

  public get name () : AbstractControl {
    return this.formData.get('name');
  }

  public get description () : AbstractControl {
    return this.formData.get('description');
  }

  public get priority () : AbstractControl {
    return this.formData.get('priority');
  }

  public get state () : AbstractControl {
    return this.formData.get('state');
  }

  public get due () : AbstractControl {
    return this.formData.get('due');
  }

  public submit () : void {
    if (this.formData.valid) {
      this.formData.patchValue({
        due: new Date(this.due.value),
        state: Number(this.state.value),
        priority: Number(this.priority.value),
      });
      this.taskRepository.update(this.workspace.id, this.project.id, this.task.id, this.formData.value)
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
      name: this.task.name,
      description: this.task.description,
      due: new Date(this.task.due).toISOString().substr(0, 10),
      priority: this.task.priority,
      state: this.task.state
    });
  }

}
