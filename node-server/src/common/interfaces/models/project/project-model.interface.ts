import { Model } from "mongoose";

import { IProjectSchema } from './project-schema.interface';
import { IProjectMethods, IProjectStaticMethods } from './project-methods.interface';

export interface IProjectModel extends IProjectMethods, IProjectStaticMethods, IProjectSchema {
}

export interface IProjectModelType extends Model<IProjectModel> {
}