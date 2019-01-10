import { Schema, SchemaDefinition } from 'mongoose';

export const EventStructure : SchemaDefinition = {
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
  colors: {
    type: {
      primary: String,
      secondary: String,
    },
    default: {
      primary: '#AD2121',
      secondary: '#FAE3E3'
    }
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
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