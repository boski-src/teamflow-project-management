import { Model } from "mongoose";

import { ITeamSchema } from './team-schema.interface';
import { ITeamMethods, ITeamStaticMethods } from './team-methods.interface';

export interface ITeamModel extends ITeamMethods, ITeamStaticMethods, ITeamSchema {
}

export interface ITeamModelType extends Model<ITeamModel> {
}