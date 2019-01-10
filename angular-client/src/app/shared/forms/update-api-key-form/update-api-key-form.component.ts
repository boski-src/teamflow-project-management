import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AccountRepositoryService } from '../../../core/repositories';
import { Error } from '../../../core/models';

@Component({
  selector: 'app-update-api-key-form',
  templateUrl: './update-api-key-form.component.html'
})
export class UpdateApiKeyFormComponent implements OnInit {

  public apiKey : string;
  @Output() public updated : EventEmitter<string> = new EventEmitter<string>();
  @Output() public error : EventEmitter<Error> = new EventEmitter<Error>();

  constructor (private accountRepository : AccountRepositoryService) { }

  public ngOnInit () {
    this.accountRepository.getApiKey()
      .subscribe(data => this.apiKey = data);
  }

  public submit (password : string) : void {
    if (password) {
      this.accountRepository.updateApiKey(password)
        .subscribe(
          data => {
            this.apiKey = data;
            this.updated.emit(data);
          },
          ({ error }) => this.error.emit(new Error(error.error.data))
        );
    }
  }

}
