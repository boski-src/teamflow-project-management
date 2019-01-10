import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export interface IUserRepositoryService {

  get (userId : Types.ObjectId) : Observable<Object>;

  getByName (name : string, limit : string) : Observable<Object>;

}