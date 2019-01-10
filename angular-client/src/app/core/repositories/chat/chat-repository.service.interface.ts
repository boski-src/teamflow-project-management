import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export interface IChatCreateData {
  name : string;
  description : string;
}

export interface IChatUpdateData {
  name : string;
  description : string;
}

export interface IChatRepositoryService {

  create (teamId : Types.ObjectId, data : IChatCreateData) : Observable<Object>;

  createMessage (teamId : Types.ObjectId, chatId : Types.ObjectId, text : string) : Observable<Object>;

  getAll (teamId : Types.ObjectId) : Observable<Object>;

  getAllPaging (teamId : Types.ObjectId, start : number, limit : number) : Observable<Object>;

  get (teamId : Types.ObjectId, chatId : Types.ObjectId) : Observable<Object>;

  getMessages (teamId : Types.ObjectId, chatId : Types.ObjectId) : Observable<Object>;

  update (teamId : Types.ObjectId, chatId : Types.ObjectId, data : IChatUpdateData) : Observable<Object>;

  updateName (teamId : Types.ObjectId, chatId : Types.ObjectId, name : string) : Observable<Object>;

  updateDesc (teamId : Types.ObjectId, chatId : Types.ObjectId, description : string) : Observable<Object>;

  delete (teamId : Types.ObjectId, chatId : Types.ObjectId) : Observable<Object>;

}