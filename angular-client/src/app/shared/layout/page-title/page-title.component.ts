import { Component, Input } from '@angular/core';

import { TitleService } from '../../../core/services';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html'
})
export class PageTitleComponent {

  public item : string = '';
  @Input() public background : string = '';

  constructor (private titleService : TitleService) { }

  @Input()
  public set title (value : string) {
    if (value.length && value.indexOf('undefined') === -1) {
      setTimeout(() => {
        this.item = value;
        this.titleService.title = [value];
      });
    }
  }

}
