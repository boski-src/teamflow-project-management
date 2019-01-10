import { Schema } from 'mongoose';

import { mongoModel, mongoSchema, mongoTrash } from '../../libs/mongo';
import { IEventModelType, IEventSchema } from '../../../common/interfaces';

import { EventStructure } from './event-structure';
import { EventMethods, ExampleStaticMethods } from './event-methods';

const EventSchema : Schema = mongoSchema(EventStructure, EventMethods, ExampleStaticMethods);

EventSchema.plugin(mongoTrash);

export const EventModel : IEventModelType = mongoModel<IEventSchema, IEventModelType>('event', EventSchema);