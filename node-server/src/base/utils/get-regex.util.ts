const regexList = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
  objectId: /^[a-f\d]{24}$/i
};

export type Patterns = 'email' | 'objectId';

export function getRegex (name : Patterns) : RegExp {
  return new RegExp(regexList[name]);
}