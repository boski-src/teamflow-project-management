import * as passport from 'passport';
import { bearerStrategy, facebookTokenStrategy, localStrategy } from './strategies';

export function passportInit () {
  passport.use(localStrategy);
  passport.use(facebookTokenStrategy);
  passport.use(bearerStrategy);
}