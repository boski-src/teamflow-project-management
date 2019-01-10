import { Model } from 'mongoose';

import { IChatSchema } from './chat-schema.interface';
import { IChatMethods, IChatStaticMethods } from './chat-methods.interface';

export interface IChatModel extends IChatMethods, IChatStaticMethods, IChatSchema {
}

export interface IChatModelType extends Model<IChatModel> {
}