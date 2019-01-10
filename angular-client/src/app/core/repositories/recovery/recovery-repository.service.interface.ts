import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export interface IRecoveryRepositoryService {

  sendMail (email : string) : Observable<Object>;

  validToken (userId : Types.ObjectId, token : string) : Observable<Object>;

  updatePassword (userId : Types.ObjectId, token : string, newPassword : string) : Observable<Object>;

}