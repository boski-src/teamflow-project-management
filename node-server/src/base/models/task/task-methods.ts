import { pick } from 'lodash';

import { ITaskMethods, ITaskStaticMethods } from '../../../common/interfaces';

export const TaskMethods : ITaskMethods = {
  formatDocument (props? : string[]) : object {
    let custom = ['_project', 'id', 'name', 'description', 'author', 'state', 'priority', 'due', 'createdAt', 'updatedAt'];
    return pick(this, props ? props : custom);
  }
};

export const TaskStaticMethods : ITaskStaticMethods = {};