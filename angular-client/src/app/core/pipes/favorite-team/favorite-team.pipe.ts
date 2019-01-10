import { Pipe, PipeTransform } from '@angular/core';

import { LocalStorageService, StoreService } from '../../services';
import { Team } from '../../models';

@Pipe({
  name: 'favoriteTeam'
})
export class FavoriteTeamPipe implements PipeTransform {

  constructor (
    private localStorageService : LocalStorageService,
    private storeService : StoreService,
  ) {}

  transform () : Team[] {
    return this.storeService.workspaces.filter((team : Team) : boolean => {
      return !!this.localStorageService.teams.find(id => id === team.id);
    });
  }

}
