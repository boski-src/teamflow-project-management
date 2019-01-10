import { Types } from "mongoose";

export interface IMongoTrash {
  trash () : Promise<any>

  trashById (id : Types.ObjectId, userId : Types.ObjectId) : Promise<any>

  trashOne (conditions : object, userId : Types.ObjectId) : Promise<any>

  trashMany (conditions : object, userId : Types.ObjectId) : Promise<any>
}