import { Schema } from 'mongoose';

import { mongoModel, mongoSchema, mongoTrash } from '../../libs/mongo';
import { IMessageModel, IMessageModelType } from '../../../common';

import { MessageStructure } from './message-structure';
import { MessageMethods, MessageStaticMethods } from './message-methods';

const MessageSchema : Schema = mongoSchema(MessageStructure, MessageMethods, MessageStaticMethods);

MessageSchema.plugin(mongoTrash);

export const MessageModel : IMessageModelType = mongoModel<IMessageModel, IMessageModelType>('Message', MessageSchema);