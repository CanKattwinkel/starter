import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {PrkConfig} from '../config/config.model';
import {UserService} from '../user/user.service';
import {UserEntity} from '../user/user.entity';
import {UserLevel} from '../user/user-level.enum';
import {compareIt} from '../../utils/encrypt';
import {HttpException} from '@nestjs/core';
import {UserInfo} from '@core/auth/user-info';
import {addSeconds} from 'date-fns';
import {ServerOnlyTokenInfo} from './token-info';
import * as v4 from 'uuid/v4';
import {Request} from 'express';
import {SessionService, SessionTokenPayload} from '../session/session.service';
import {SessionEntity} from '../session/session.entity';

@Component()
export class AuthService {

  constructor(private config: PrkConfig, private userService: UserService, private sessionService: SessionService) {
  }

  async createToken(mail: string, userLevel: UserLevel, session: SessionEntity): Promise<ServerOnlyTokenInfo> {
    const expiresIn = this.config.runtimeConfiguration.jwtExpiresIn;
    const expiresAt = addSeconds(new Date(), expiresIn);
    const userInfo: UserInfo = {mail, userLevel, expiresAt, xsrfToken: v4(), sessionId: session.id};
    const token = jwt.sign(userInfo, this.config.runtimeConfiguration.jwtSecret, {expiresIn});
    return {
      tokenResponse: userInfo,
      access_token: token,
      session,
    };
  }

  async login(mail: string, password: string, req: Request): Promise<ServerOnlyTokenInfo> {
    const user: UserEntity = await this.userService.getByMail(mail) as UserEntity;
    const passwordMatch = await compareIt(password, user.password);
    if (!passwordMatch) {
      throw new HttpException('unauthorized', 401);
    }

    const session = await this.sessionService.create(req, user);
    return await this.createToken(user.mail, user.userLevel, session);
  }


  async register(mail: string, password: string, req: Request): Promise<ServerOnlyTokenInfo> {
    const user = await this.userService.register(mail, password);
    const session = await this.sessionService.create(req, user);
    return this.createToken(user.mail, user.userLevel, session);
  }



  // maybe deprecate this.
  async renewal(user: UserEntity, unverifiedToken: string): Promise<ServerOnlyTokenInfo> {
    const verifiedUserInfo: UserInfo = jwt.verify(unverifiedToken, this.config.runtimeConfiguration.jwtSecret) as UserInfo;
    try {
      const session = await this.sessionService.byId(verifiedUserInfo.sessionId);
      const serverOnlyInfo = await  this.createToken(user.mail, user.userLevel, session);
      await this.sessionService.update(session.id, {lastUsed: new Date()});
      return serverOnlyInfo;
    } catch (e) {
      throw new HttpException('unauthorized', 401);
    }

  }

  async validateUser(signedUser: UserInfo): Promise<boolean> {
    return !!await this.userService.getByMail(signedUser.mail);
  }


  async refurbishment(refreshToken: string): Promise<ServerOnlyTokenInfo> {
    const verifiedSessionInfo: SessionTokenPayload = jwt.verify(refreshToken, this.config.runtimeConfiguration.jwtSecret) as SessionTokenPayload;
    try {
      const session = await this.sessionService.byId(verifiedSessionInfo.sessionId);
      const serverOnlyInfo = await  this.createToken(session.user.mail, session.user.userLevel, session);
      console.log(`refurbishment of session with id ${session.id}`);
      await this.sessionService.update(session.id, {lastUsed: new Date()});
      return serverOnlyInfo
    } catch (e) {
      throw new HttpException('unauthorized', 401);
    }
  }
}
