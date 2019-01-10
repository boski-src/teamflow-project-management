import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../core/services';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor (private titleService : TitleService) { }

  public ngOnInit () {
    this.titleService.title = ['Error', 'Page Not Found :('];
  }

}
