import { Schema, SchemaDefinition } from 'mongoose';

export const ChatStructure : SchemaDefinition = {
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
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
    required: true
  }]
};