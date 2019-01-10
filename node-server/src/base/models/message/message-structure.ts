import { Schema, SchemaDefinition } from 'mongoose';

export const MessageStructure : SchemaDefinition = {
  _chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  invoker: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  }
};