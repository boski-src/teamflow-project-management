import { Schema } from 'mongoose';

import { mongoModel, mongoSchema, mongoTrash } from '../../libs/mongo';
import { ITaskModelType, ITaskSchema } from '../../../common/interfaces';

import { TaskStructure } from './task-structure';
import { TaskMethods, TaskStaticMethods } from './task-methods';

const TaskSchema : Schema = mongoSchema(TaskStructure, TaskMethods, TaskStaticMethods);

TaskSchema.plugin(mongoTrash);

export const TaskModel : ITaskModelType = mongoModel<ITaskSchema, ITaskModelType>('Task', TaskSchema);