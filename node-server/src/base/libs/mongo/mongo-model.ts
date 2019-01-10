import { Document, Model, model, Schema } from 'mongoose';

export function mongoModel<S extends Document, M extends Model<S>> (name : string, schema : Schema) {
  return model<S, M>(name, schema);
}