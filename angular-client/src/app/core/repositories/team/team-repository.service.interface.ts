import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export interface ITeamCreateData {
  name : string;
  description : string;
}

export interface ITeamUpdateData {
  name : string;
  description : string;
}

export interface ITeamRepositoryService {

  create (data : ITeamCreateData) : Observable<Object>;

  getAll () : Observable<Object>;

  getAllPaging (start : number, limit : number) : Observable<Object>;

  get (teamId : Types.ObjectId) : Observable<Object>;

  getRoles (teamId : Types.ObjectId) : Observable<Object>;

  getAdmins (teamId : Types.ObjectId) : Observable<Object>;

  getAdminsPaging (teamId : Types.ObjectId, start : number, limit : number) : Observable<Object>;

  getMembers (teamId : Types.ObjectId) : Observable<Object>;

  getMembersPaging (teamId : Types.ObjectId, start : number, limit : number) : Observable<Object>;

  update (teamId : Types.ObjectId, data : ITeamUpdateData) : Observable<Object>;

  updateName (teamId : Types.ObjectId, name : string) : Observable<Object>;

  updateDesc (teamId : Types.ObjectId, description : string) : Observable<Object>;

  updateAdmins (teamId : Types.ObjectId, admins : Types.ObjectId[]) : Observable<Object>;

  updateMembers (teamId : Types.ObjectId, members : Types.ObjectId[]) : Observable<Object>;

  leaveFromAdmin (teamId : Types.ObjectId) : Observable<Object>;

  leaveFromMember (teamId : Types.ObjectId) : Observable<Object>;

  delete (teamId : Types.ObjectId, password : string) : Observable<Object>;

}