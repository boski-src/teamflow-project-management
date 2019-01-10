export interface IUserRepositoryCreateGitHubData {
  _github : {
    id : number | string,
    token : string
  }
  firstName : string
  lastName : string
  email : string
}