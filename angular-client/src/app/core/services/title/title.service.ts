import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { meta } from '../../../../environments/meta';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor (private browserTitle : Title) { }

  public set title (pages : string[] | any) {
    pages = pages.slice().reverse();

    this.browserTitle.setTitle(`${pages.join(' - ')} | ${meta.name}`);
  }

  public get title () : string | any {
    return this.browserTitle.getTitle();
  }

}
