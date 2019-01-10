import { Types } from "mongoose";

export interface ITeamRepositoryCreateData {
  name : string
  description? : string
  admins : Types.ObjectId[]
  leader : Types.ObjectId
}

