import {Middleware} from '@nestjs/common/utils/decorators/component.decorator';
import {HttpException, NestMiddleware} from '@nestjs/common';
import * as passport from 'passport';
import {Request} from 'express';
import {headerNameXsrf} from '@core/auth/xsrf-token';
import {extractJwt} from '../../utils/extract-jwt';
import {PrkConfig} from '../config/config.model';
import {UserInfo} from '@core/auth/user-info';
import * as jwt from 'jsonwebtoken';

@Middleware()
export class AuthMiddleware implements NestMiddleware {


  constructor(private config: PrkConfig) {
  }

  resolve() {
    return async (req, res, next) => {
      this.checkXsrfToken(req);
      return await passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
          console.log(err);
          next(new HttpException(err, 401));
        }
        else {
          next();
        }
      })(req, res, next);
    };
  }


  /**
   * Checks whether the xsrf Header is set and matches the default one*/
  checkXsrfToken(req: Request) {
    const received: string | undefined = req.header(headerNameXsrf);
    if (!received) {
      this.throwError('No  XSRF Header provided!');
    }
    let token = extractJwt(req);
    if (!token) {
      this.throwError('No token provieded!');
    }

    let verified: UserInfo | null;

    try {
      verified = jwt.verify(token, this.config.runtimeConfiguration.jwtSecret) as UserInfo;
    } catch (e) {
      this.throwError('Couldn\'t verify a token');
    }


    if (!verified || received !== verified.xsrfToken) {
      // force jump to catch block..
      // throw new HttpException('unauthorized', 401);
      this.throwError('Attempted Auth with invalid XSRF Header!');
    }
  }

  throwError(logMsg: string) {
    console.log(logMsg);
    throw new HttpException('unauthorized', 401);
  }
}
