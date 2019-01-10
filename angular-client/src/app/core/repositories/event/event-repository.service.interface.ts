import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export interface IEventColors {
  primary : string;
  secondary : string;
}

export interface IEventCreateData {
  name : string;
  description : string;
  start : Date;
  end : Date;
  colors : IEventColors;
}

export interface IEventUpdateData {
  name : string;
  description : string;
  start : Date;
  end : Date;
  colors : IEventColors;
}

export interface IEventRepositoryService {

  create (teamId : Types.ObjectId, projectId : Types.ObjectId, data : IEventCreateData) : Observable<Object>;

  createNote (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId,
    body : string
  ) : Observable<Object>;

  getAll (teamId : Types.ObjectId, projectId : Types.ObjectId) : Observable<Object>;

  get (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId
  ) : Observable<Object>;

  getNotes (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId
  ) : Observable<Object>;

  update (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId,
    data : IEventUpdateData
  ) : Observable<Object>;

  delete (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId
  ) : Observable<Object>;

  deleteNote (
    teamId : Types.ObjectId,
    projectId : Types.ObjectId,
    eventId : Types.ObjectId,
    noteId : Types.ObjectId
  ) : Observable<Object>;

}