import { randomBytes } from 'crypto';

export function randomBuffer (stringLength : number, encode : BufferEncoding = 'hex') : string {
  return randomBytes(stringLength).toString(encode);
}