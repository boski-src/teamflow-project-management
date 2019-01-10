import { pick } from 'lodash';

import { IChatMethods, IChatStaticMethods } from '../../../common/interfaces';

export const ChatMethods : IChatMethods = {
  formatDocument (props? : string[]) : object {
    let custom = ['_team', 'id', 'name', 'manager', 'description', 'createdAt', 'updatedAt'];
    return pick(this, props ? props : custom);
  }
};

export const ChatStaticMethods : IChatStaticMethods = {};