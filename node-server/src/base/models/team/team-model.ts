import { Schema } from 'mongoose';

import { mongoModel, mongoSchema, mongoTrash } from '../../libs/mongo';
import { ITeamModelType, ITeamSchema } from '../../../common/interfaces';

import { TeamStructure } from './team-structure';
import { TeamMethods, TeamStaticMethods } from './team-methods';

export const TeamSchema : Schema = mongoSchema(TeamStructure, TeamMethods, TeamStaticMethods);

TeamSchema.plugin(mongoTrash);

TeamSchema.pre<any>('save', function (next) {
  if (!this.admins.length) throw new Error('A team must have at least one admin.');
  next();
});

export const TeamModel : ITeamModelType = mongoModel<ITeamSchema, ITeamModelType>('Team', TeamSchema);