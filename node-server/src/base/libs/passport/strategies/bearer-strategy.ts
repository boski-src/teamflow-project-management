import { Strategy } from 'passport-http-bearer';

import { userRepository } from '../../../repositories';
import { decodeJWT } from '../../../utils';

export const bearerStrategy = new Strategy(async (token, cb) => {
  let user;
  try {
    let { id, apiKey } = await decodeJWT(token);

    if (apiKey) user = await userRepository.findByApiKey(token);
    else user = await userRepository.findById(id);

    if (!user) return cb(null, false);

    return cb(null, { apiKey, user });
  }
  catch (e) {
    return cb(e, null);
  }
});