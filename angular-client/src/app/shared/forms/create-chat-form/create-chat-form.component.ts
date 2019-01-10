import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Chat, Error, Team } from '../../../core/models';
import { ChatRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-create-chat-form',
  templateUrl: './create-chat-form.component.html'
})
export class CreateChatFormComponent {

  @Input() public workspace : Team;
  @Output() public created : EventEmitter<Chat> = new EventEmitter<Chat>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (private formBuilder : FormBuilder, private chatRepository : ChatRepositoryService) { }

  private formData : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(1500)]]
  });

  public get name () : AbstractControl {
    return this.formData.get('name');
  }

  public get description () : AbstractControl {
    return this.formData.get('description');
  }

  public submit () : void {
    if (this.formData.valid) {
      this.chatRepository.create(this.workspace.id, this.formData.value)
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
