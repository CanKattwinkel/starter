import {HttpException} from '@nestjs/core';
import {Middleware} from '@nestjs/common/utils/decorators/component.decorator';
import {NestMiddleware} from '@nestjs/common';
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
    let token = extractJwt(req);
    const verified: UserInfo = jwt.verify(token, this.config.runtimeConfiguration.jwtSecret) as UserInfo;
    if (!verified || received !== verified.xsrfToken) {
      throw new HttpException('unauthorized', 401);
    }
  }
}
