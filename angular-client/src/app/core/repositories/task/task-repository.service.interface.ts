import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export interface ITaskCreateData {
  name : string;
  description : string;
  state : number;
  priority : number;
  due : Date;
}

export interface ITaskUpdateData {
  name : string;
  description : string;
  state : number;
  priority : number;
  due : Date;
}

export interface ITaskRepositoryService {

  create (teamId : Types.ObjectId, projectId : Types.ObjectId, data : ITaskCreateData) : Observable<Object>;

  createNote (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId,
    body : string
  ) : Observable<Object>;

  getAll (teamId : Types.ObjectId, projectId : Types.ObjectId) : Observable<Object>;

  get (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId
  ) : Observable<Object>;

  getNotes (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId
  ) : Observable<Object>;

  update (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId,
    data : ITaskUpdateData
  ) : Observable<Object>;

  delete (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId
  ) : Observable<Object>;

  deleteNote (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    taskId : Types.ObjectId,
    noteId : Types.ObjectId
  ) : Observable<Object>;

}