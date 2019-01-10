import { Model } from 'mongoose';

import { IMessageSchema } from './message-schema.interface';
import { IMessageMethods, IMessageStaticMethods } from './message-methods.interface';

export interface IMessageModel extends IMessageMethods, IMessageStaticMethods, IMessageSchema {
}

export interface IMessageModelType extends Model<IMessageModel> {
}