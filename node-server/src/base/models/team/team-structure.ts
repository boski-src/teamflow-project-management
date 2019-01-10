import { Schema, SchemaDefinition } from 'mongoose';

export const TeamStructure : SchemaDefinition = {
  name: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }]
};