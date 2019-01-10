import { Observable } from 'rxjs';

export interface IAccountRepositoryService {

  getCurrent () : Observable<Object>;

  getToken () : Observable<Object>;

  getApiKey () : Observable<Object>;

  getProfile () : Observable<Object>;

  getAuthentications () : Observable<Object>;

  getNotifications () : Observable<Object>;

  updateEmail (newEmail : string, password : string) : Observable<Object>;

  updatePassword (newPassword : string, password : string) : Observable<Object>;

  uploadAvatar (avatar : string) : Observable<Object>;

  updateProfile (profile : object) : Observable<Object>;

  updateApiKey (password : string) : Observable<Object>;

}