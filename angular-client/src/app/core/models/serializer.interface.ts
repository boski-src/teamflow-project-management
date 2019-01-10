export interface ISerializer {

  deserialize? <T>(data : T | any) : this;

  serialize? () : object;

}