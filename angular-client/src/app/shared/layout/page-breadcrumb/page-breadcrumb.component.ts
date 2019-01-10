import { Component, Input } from '@angular/core';
import { TitleService } from '../../../core/services';

@Component({
  selector: 'app-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html'
})
export class PageBreadcrumbComponent {

  public items : string[] = [];

  constructor (private titleService : TitleService) { }

  @Input()
  public set pages (value : string[]) {
    if (
      value.length &&
      value.findIndex(x => x === undefined) === -1 &&
      value.toString().indexOf('undefined') === -1
    ) {
      setTimeout(() => {
        this.items = value;
        this.titleService.title = value;
      });
    }
  }

}
