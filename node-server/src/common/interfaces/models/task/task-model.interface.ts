import { Model } from 'mongoose';

import { ITaskSchema } from './task-schema.interface';
import { ITaskMethods, ITaskStaticMethods } from './task-methods.interface';

export interface ITaskModel extends ITaskMethods, ITaskStaticMethods, ITaskSchema {
}

export interface ITaskModelType extends Model<ITaskModel> {
}