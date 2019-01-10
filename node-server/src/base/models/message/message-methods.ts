import { pick } from 'lodash';

import { IMessageMethods, IMessageStaticMethods } from '../../../common/interfaces';

export const MessageMethods : IMessageMethods = {
  formatDocument (props? : string[]) : object {
    let custom = ['_chat', 'id', 'invoker', 'body', 'createdAt'];
    return pick(this, props ? props : custom);
  }
};

export const MessageStaticMethods : IMessageStaticMethods = {};