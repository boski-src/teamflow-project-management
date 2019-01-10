import { Schema, SchemaDefinition } from 'mongoose';

export const ProjectStructure : SchemaDefinition = {
  _team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  name: {
    type: String,
    index: true,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  deadline: {
    type: Date,
    null: true,
    default: null
  },
  finished: {
    type: Boolean,
    default: false
  }
};