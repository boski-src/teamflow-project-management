import { IUserModel } from './user-model.interface';

export interface IUserMethods {
  encodePassword (plainPassword : string) : Promise<string>

  comparePassword (password : string) : Promise<boolean>

  generateRecoveryToken () : string

  compareRecoveryToken (token : string) : boolean

  newAuthentication (ip : string) : Promise<IUserModel>

  generateToken (isApi? : boolean) : string

  formatDocument? (props? : string[]) : object
}

export interface IUserStaticMethods {
  findByIdAndCheckPassword (id, password) : Promise<IUserModel>

  findByEmailAndCheckPassword (email, password) : Promise<IUserModel>

  findByIdAndCheckRecovery (id, token) : Promise<IUserModel>
}