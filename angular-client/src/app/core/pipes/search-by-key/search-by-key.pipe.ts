import { Pipe, PipeTransform } from '@angular/core';
import { Chat, Event, Project, Task, Team, User } from '../../models';

type ObjectModelType = User | Team | Project | Chat | Task | Event;

@Pipe({
  name: 'searchByKey'
})
export class SearchByKeyPipe implements PipeTransform {

  transform (value : any, settings : { keys : string[], value : string }) : Team[] {
    return value.filter((obj : ObjectModelType) : boolean => {
      if (!settings.value || !settings.keys.length) return true;
      return settings.keys.some(key => this.rgx(obj, key, settings.value));
    });
  }

  private rgx (obj : ObjectModelType, key : string, value : string) {
    return obj[key].search(new RegExp(value, 'i')) >= 0;
  }

}
