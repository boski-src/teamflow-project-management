import { Schema, SchemaDefinition } from 'mongoose';

export function mongoSchema (fields : SchemaDefinition, methods : object = {}, statics : object = {}) : Schema {
  const schema : Schema = new Schema(fields, { timestamps: true });

  schema.methods = methods;
  schema.statics = statics;
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.trasher
    }
  });

  return schema;
}