import * as passport from 'passport';
import {Strategy} from 'passport-jwt';
import {Component} from '@nestjs/common';
import {AuthService} from '../auth.service';
import {PrkConfig} from '../../config/config.model';
import {extractJwt} from '../../../utils/extract-jwt';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService, config: PrkConfig) {
    super(
      {
        jwtFromRequest: extractJwt,
        passReqToCallback: true,
        secretOrKey: config.runtimeConfiguration.jwtSecret,
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }

  public async verify(req, payload, done) {
    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized1', false);
    }
    done(null, payload);
  }
}
