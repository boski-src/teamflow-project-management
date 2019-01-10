import { Schema, Types } from 'mongoose';

const methods : string[] = [
  'count',
  'update',
  'updateMany',
  'updateOne',
  'find',
  'findOne',
  'findOneAndUpdate'
];

export function mongoTrash (schema : Schema) : void {

  schema.add({
    deleted: Boolean,
    trasher: {
      type: Types.ObjectId,
      ref: 'User',
      null: true,
      default: null
    },
    deletedAt: Date
  });

  methods.forEach(method => {
    schema.pre<any>(method, function (next) {
      this.where({ deleted: { $ne: true } });
      next();
    });
  });

  schema.methods.trash = function (userId : boolean = false) : Promise<any> {
    this.deleted = true;
    this.trasher = userId;
    this.deletedAt = new Date();
    return this.save();
  };

  schema.statics.trashById = function (id : Types.ObjectId, userId : Types.ObjectId = null) : Promise<any> {
    let update = { deleted: true, trasher: userId, deletedAt: new Date() };
    return this.findByIdAndUpdate(id, { $set: update }, { new: true }).exec();
  };

  schema.statics.trashOne = function (conditions : object, userId : Types.ObjectId = null) : Promise<any> {
    let update = { deleted: true, trasher: userId, deletedAt: new Date() };
    return this.updateOne(conditions, { $set: update }, { new: true }).exec();
  };

  schema.statics.trashMany = function (conditions : object, userId : Types.ObjectId = null) : Promise<any> {
    let update = { deleted: true, trasher: userId, deletedAt: new Date() };
    return this.update(conditions, { $set: update }, { new: true }).exec();
  };

}