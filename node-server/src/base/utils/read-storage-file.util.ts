import { readFileSync } from 'fs';

export function readStorageFile (file) : string | Buffer {
  return readFileSync(`${__dirname}/../../../storage/` + file, 'utf8');
}