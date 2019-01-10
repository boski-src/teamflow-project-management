import { verify, VerifyOptions } from 'jsonwebtoken';

import { configLoader } from '../libs/config-loader';

export function decodeJWT (token : string) : any {
  let opt : VerifyOptions = {
    algorithms: [
      'ES256'
    ]
  };

  return verify(token, configLoader.readFile(
    configLoader.get('application.certs.jwt-public')
  ), opt);
}