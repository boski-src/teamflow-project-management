import { pick } from 'lodash';

import { IProjectMethods, IProjectStaticMethods } from '../../../common/interfaces';

export const ProjectMethods : IProjectMethods = {
  formatDocument (props? : string[]) : object {
    return pick(this, props ? props : ['_team', 'id', 'name', 'description', 'manager', 'deadline', 'createdAt', 'updatedAt']);
  }
};

export const ProjectStaticMethods : IProjectStaticMethods = {};