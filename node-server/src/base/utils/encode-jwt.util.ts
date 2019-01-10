import { sign, SignOptions } from 'jsonwebtoken';

import { configLoader } from '../libs/config-loader';

export function encodeJWT (payload : any, apiKey? : boolean) : string {
  let opt : SignOptions = {
    algorithm: 'ES256',
    expiresIn: apiKey ? configLoader.get('application.security.apikey-expire') : configLoader.get('application.security.jwt-expire')
  };

  return sign({ ...payload, apiKey }, configLoader.readFile(
    configLoader.get('application.certs.jwt-private')
  ), opt);
}