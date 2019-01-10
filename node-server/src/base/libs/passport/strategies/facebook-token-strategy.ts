import * as Strategy from 'passport-facebook-token';

import { configLoader } from '../../config-loader';
import { userRepository } from '../../../repositories';

let opt = {
  clientID: configLoader.get('application.facebook.appId'),
  clientSecret: configLoader.get('application.facebook.appSecret'),
  passReqToCallback: <true>true
};

export const facebookTokenStrategy = new Strategy(opt, async (req, accessToken, refreshToken, profile, cb) => {
  let { id, name, first_name, last_name, email } = profile._json;

  let user = await userRepository.findByCustom('_facebook.id', id);

  if (!user) {
    try {
      user = await userRepository.create({
        _facebook: {
          id,
          token: accessToken,
          email
        },
        firstName: first_name,
        lastName: last_name,
        email: 'facebook:' + email
      });
    }
    catch (e) {
      return cb(e, null);
    }
  }

  await user.newAuthentication(<string>req.headers['X-Real-IP'] || req.ip || req.connection.remoteAddress);

  return cb(null, user);
});