import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export interface IProjectCreateData {
  name : string;
  description : string;
  deadline : string;
}

export interface IProjectUpdateData {
  name : string;
  description : string;
  deadline : Date;
  finished : boolean;
}

export interface IProjectRepositoryService {

  create (teamId : Types.ObjectId, data : IProjectCreateData) : Observable<Object>;

  getAll (teamId : Types.ObjectId) : Observable<Object>;

  getAllPaging (teamId : Types.ObjectId, start : number, limit : number) : Observable<Object>;

  get (teamId : Types.ObjectId, projectId : Types.ObjectId) : Observable<Object>;

  getTasks (teamId : Types.ObjectId, projectId : Types.ObjectId) : Observable<Object>;

  getEvents (teamId : Types.ObjectId, projectId : Types.ObjectId) : Observable<Object>;

  update (teamId : Types.ObjectId, projectId : Types.ObjectId, data : IProjectUpdateData) : Observable<Object>;

  updateName (teamId : Types.ObjectId, projectId : Types.ObjectId, name : string) : Observable<Object>;

  updateDesc (teamId : Types.ObjectId, projectId : Types.ObjectId, description : string) : Observable<Object>;

  updateDeadline (teamId : Types.ObjectId, projectId : Types.ObjectId, deadline : string) : Observable<Object>;

  updateFinished (teamId : Types.ObjectId, projectId : Types.ObjectId, finished : boolean) : Observable<Object>;

  delete (teamId : Types.ObjectId, projectId : Types.ObjectId) : Observable<Object>;

}