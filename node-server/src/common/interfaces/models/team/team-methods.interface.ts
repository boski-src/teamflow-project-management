import { Types } from "mongoose";
import { ITeamSchema } from './team-schema.interface';

export interface ITeamMethods {
  isMember (userId : Types.ObjectId) : boolean

  isAdmin (userId : Types.ObjectId) : boolean

  hasAccess (userId : Types.ObjectId) : boolean

  formatDocument (props? : string[]) : object
}

export interface ITeamStaticMethods {
  findByIdAndCheckAdmin (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamSchema>

  findByIdAndCheckAccess (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamSchema>
}