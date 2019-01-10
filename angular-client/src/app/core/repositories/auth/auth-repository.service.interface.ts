import { Observable } from 'rxjs';

export interface IAuthCreateData {
  firstName : string;
  lastName : string;
  email : string;
  password : string;
}

export interface IAuthLoginData {
  email : string;
  password : string;
}

export interface IAuthRepositoryService {

  createAccount (data : IAuthCreateData) : Observable<Object>;

  login (data : IAuthLoginData) : Observable<Object>;

  loginFacebook (accessToken : string, refreshToken : string) : Observable<Object>;

}