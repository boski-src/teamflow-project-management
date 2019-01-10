import { Schema, SchemaDefinition } from 'mongoose';

export const TaskStructure : SchemaDefinition = {
  _project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  state: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  priority: {
    type: Number,
    min: 1,
    max: 3,
    default: 1
  },
  due: {
    type: Date,
    null: true,
    default: null
  },
  notes: [{
    invoker: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    body: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: () => Date.now()
    }
  }]
};