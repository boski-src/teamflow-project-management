import { Strategy } from 'passport-local';

import { userRepository } from '../../../repositories';

let opt = {
  usernameField: 'email',
  passReqToCallback: <true>true
};

export const localStrategy = new Strategy(opt, async (req, email, password, cb) => {
  try {
    let user = await userRepository.findByEmail(email);
    if (!await user.comparePassword(password)) return cb('Password is invalid.', false);

    await user.newAuthentication(<string>req.headers['X-Real-IP'] || req.ip || req.connection.remoteAddress);

    return cb(null, user);
  }
  catch (e) {
    return cb(e, null);
  }
});