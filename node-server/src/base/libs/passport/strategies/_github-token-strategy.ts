import * as Strategy from 'passport-github-token';

import { userRepository } from '../../../repositories';
import { configLoader } from '../../config-loader';

let opt = {
  clientID: configLoader.get('application.github.appId'),
  clientSecret: configLoader.get('application.github.appSecret'),
  passReqToCallback: <true>true
};

export const _githubTokenStrategy = new Strategy(opt, async (req, accessToken, refreshToken, profile, cb) => {
  let user = await userRepository.findByCustom('_github.id', profile.id);

  if (!user) {
    try {
      user = await userRepository.create({
        _github: {
          id: profile.id,
          token: accessToken,
          email: profile.emails[0].value
        },
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        email: 'github:' + profile.emails[0].value
      });
    }
    catch (e) {
      return cb(e, null);
    }
  }

  await user.newAuthentication(req.ip || req.connection.remoteAddress);

  return cb(null, user);
});