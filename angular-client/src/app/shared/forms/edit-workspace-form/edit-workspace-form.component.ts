import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Team, Error } from '../../../core/models';
import { TeamRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-edit-workspace-form',
  templateUrl: './edit-workspace-form.component.html'
})
export class EditWorkspaceFormComponent implements OnInit {

  @Input() public workspace : Team;
  @Output() public updated : EventEmitter<Team> = new EventEmitter<Team>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (private formBuilder : FormBuilder, private teamRepository : TeamRepositoryService) { }

  private formData : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(2000)]]
  });

  public get name () : AbstractControl {
    return this.formData.get('name');
  }

  public get description () : AbstractControl {
    return this.formData.get('description');
  }

  public submit () : void {
    if (this.formData.valid) {
      this.teamRepository.update(this.workspace.id, this.formData.value)
        .subscribe(
          data => this.updated.emit(data),
          ({ error }) => this.error.emit(new Error(error.error.data))
        );
    }
  }

  public ngOnInit () {
    this.formData.setValue({
      name: this.workspace.name,
      description: this.workspace.description
    });
  }

}
