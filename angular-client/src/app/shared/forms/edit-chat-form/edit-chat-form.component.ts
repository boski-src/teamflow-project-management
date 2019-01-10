import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Team, Error, Chat } from '../../../core/models';
import { ChatRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-edit-chat-form',
  templateUrl: './edit-chat-form.component.html'
})
export class EditChatFormComponent implements OnInit {

  @Input() public workspace : Team;
  @Input() public chat : Chat;
  @Output() public updated : EventEmitter<Chat> = new EventEmitter<Chat>();
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
      this.chatRepository.update(this.workspace.id, this.chat.id, this.formData.value)
        .subscribe(
          data => this.updated.emit(data),
          ({ error }) => this.error.emit(new Error(error.error.data))
        );
    }
  }

  public ngOnInit () {
    this.formData.setValue({
      name: this.chat.name,
      description: this.chat.description
    });
  }

}
