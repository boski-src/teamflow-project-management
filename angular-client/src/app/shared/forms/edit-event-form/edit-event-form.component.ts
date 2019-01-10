import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { Error, Event, Project, Team } from '../../../core/models';
import { EventRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-edit-event-form',
  templateUrl: './edit-event-form.component.html'
})
export class EditEventFormComponent implements OnInit {

  @Input() public workspace : Team;
  @Input() public project : Project;
  @Input() public event : Event;
  @Output() public updated : EventEmitter<Event> = new EventEmitter<Event>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (private formBuilder : FormBuilder, private eventRepository : EventRepositoryService) { }

  private formData : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(1000)]],
    start: [null, [CustomValidators.date, CustomValidators.minDate(Date.now())]],
    end: [null, [CustomValidators.date, CustomValidators.minDate(Date.now())]],
    colors: this.formBuilder.group({
      primary: ['', [Validators.required]],
      secondary: ['', [Validators.required]]
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
      this.eventRepository.update(this.workspace.id, this.project.id, this.event.id, this.formData.value)
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
      name: this.event.name,
      description: this.event.description,
      start: new Date(this.event.start).toISOString().substr(0, 19),
      end: new Date(this.event.end).toISOString().substr(0, 19),
      colors: this.event.colors
    });
  }

}
