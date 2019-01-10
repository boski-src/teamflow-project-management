import { Schema } from 'mongoose';

import { mongoModel, mongoSchema, mongoTrash } from '../../libs/mongo';
import { IProjectModelType, IProjectSchema } from '../../../common/interfaces';

import { ProjectStructure } from './project-structure';
import { ProjectMethods, ProjectStaticMethods } from './project-methods';

export const ProjectSchema : Schema = mongoSchema(ProjectStructure, ProjectMethods, ProjectStaticMethods);

ProjectSchema.plugin(mongoTrash);

export const ProjectModel : IProjectModelType = mongoModel<IProjectSchema, IProjectModelType>('Project', ProjectSchema);