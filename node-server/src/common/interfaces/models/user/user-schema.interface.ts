import { Document, Types } from 'mongoose';

export interface IUserSchema extends Document {
  _id : Types.ObjectId
  firstName? : string
  lastName? : string
  email? : string
  online? : boolean
  password? : string
  recovery? : string
  apiKey? : string
  profile? : IUserProfile
  notifications? : IUserNotification[]
  authentications? : IUserAuthentication[]
  createdAt? : Date
  updatedAt? : Date
}

export interface IUserProfile {
  fullName : string
  about : string
  title : string
  community : [{ platform : string, url : string }]
}

export interface IUserNotification {
  code : string
  vars? : string[]
  date : Date
}

export interface IUserAuthentication {
  from : string
  date : Date
}