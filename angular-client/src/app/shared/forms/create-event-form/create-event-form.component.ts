import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { Error, Event, Project, Team } from '../../../core/models';
import { EventRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-create-event-form',
  templateUrl: './create-event-form.component.html'
})
export class CreateEventFormComponent {

  @Input() public workspace : Team;
  @Input() public project : Project;
  @Output() public created : EventEmitter<Event> = new EventEmitter<Event>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (private formBuilder : FormBuilder, private eventRepository : EventRepositoryService) { }

  private formData : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(1000)]],
    start: [new Date().toISOString().substr(0, 19), [
      CustomValidators.date,
      CustomValidators.minDate(Date.now())
    ]],
    end: [new Date().toISOString().substr(0, 19), [
      CustomValidators.date,
      CustomValidators.minDate(Date.now())
    ]],
    colors: this.formBuilder.group({
      primary: ['#AD2121', [Validators.required]],
      secondary: ['#FAE3E3', [Validators.required]]
    })
  });

  public get name () : AbstractControl {
    return this.formData.get('name');
  }

  public get description () : AbstractControl {
    return this.formData.get('description');
  }

  public get start () : AbstractControl {
    return this.formData.get('start');
  }

  public get end () : AbstractControl {
    return this.formData.get('end');
  }

  public get primary () : AbstractControl {
    return this.formData.get('colors').get('primary');
  }

  public get secondary () : AbstractControl {
    return this.formData.get('colors').get('secondary');
  }

  public submit () : void {
    if (this.formData.valid) {
      this.formData.patchValue({
        start: new Date(this.start.value),
        end: new Date(this.end.value)
      });
      this.eventRepository.create(this.workspace.id, this.project.id, this.formData.value)
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
