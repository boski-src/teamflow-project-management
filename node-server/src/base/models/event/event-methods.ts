import { pick } from 'lodash';

import { IEventMethods, IEventStaticMethods } from '../../../common/interfaces';

export const EventMethods : IEventMethods = {
  formatDocument (props? : string[]) : object {
    let custom = ['_project', 'id', 'name', 'description', 'author', 'colors', 'start', 'end', 'createdAt', 'updatedAt'];
    return pick(this, props ? props : custom);
  }
};

export const ExampleStaticMethods : IEventStaticMethods = {};