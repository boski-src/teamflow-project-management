import { Model } from 'mongoose';

import { IEventSchema } from './event-schema.interface';
import { IEventMethods, IEventStaticMethods } from './event-methods.interface';

export interface IEventModel extends IEventMethods, IEventStaticMethods, IEventSchema {
}

export interface IEventModelType extends Model<IEventModel> {
}