import { client } from '../utils/client';

export function loginLocalAccount (email : string, password : string) : Promise<any> {
  return client().post('/auth/local', { email, password });
}

export function createLocalAccount (data: { email, password, firstName, lastName }) : Promise<any> {
  return client().post('/auth/local/create', data);
}