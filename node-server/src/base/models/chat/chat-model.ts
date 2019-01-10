import { Schema } from 'mongoose';

import { mongoModel, mongoSchema, mongoTrash } from '../../libs/mongo';
import { IChatModel, IChatModelType } from '../../../common';

import { ChatStructure } from './chat-structure';
import { ChatMethods, ChatStaticMethods } from './chat-methods';

const ChatSchema : Schema = mongoSchema(ChatStructure, ChatMethods, ChatStaticMethods);

ChatSchema.plugin(mongoTrash);

// ChatSchema.pre<any>('findOneAndUpdate', async function (next) {
//   if (this.isModified('messages')) this.apiKey = this.generateToken(true);
//   next();
// });

export const ChatModel : IChatModelType = mongoModel<IChatModel, IChatModelType>('Chat', ChatSchema);