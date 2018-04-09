import {ExpressMiddleware, Middleware, NestMiddleware} from '@nestjs/common';
import {AsyncExpressMiddleware} from '@nestjs/common/interfaces';
import {UserService} from './user.service';
import {extractJwt} from '../../utils/extract-jwt';
import * as jwt from 'jsonwebtoken';
import {PrkConfig} from '../config/config.model';
import {UserInfo} from '@core/auth/user-info';


/**
 * I try to add a user to any http request. If there is no token info, I don't throw.*/
@Middleware()
export class UserMiddleware implements NestMiddleware {

  constructor(private userService: UserService, private config: PrkConfig) {
  }

  resolve(...args: any[]): ExpressMiddleware | AsyncExpressMiddleware | Promise<AsyncExpressMiddleware> {
    return async (req, res, next) => {
      const jwtToken = extractJwt(req);
      if (!jwtToken) {
        next();
        return;
      }

      try {
        const verified: UserInfo = jwt.verify(jwtToken, this.config.runtimeConfiguration.jwtSecret) as UserInfo;
        req.user = await this.userService.getByMail(verified.mail);
      } catch (err) {
        // couldnt add any user;
      }

      next();
    };
  }
}
