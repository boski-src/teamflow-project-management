export interface IUserRepositoryCreateFacebookData {
  _facebook : {
    id : number | string,
    token : string,
    email : string
  }
  firstName : string
  lastName : string
  email : string
}