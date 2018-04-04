import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {PrkConfig} from '../config/config.model';
import {UserService} from '../user/user.service';
import {UserEntity} from '../user/user.entity';
import {UserLevel} from '../user/user-level.enum';
import {compareIt} from '../../utils/encrypt';
import {HttpException} from '@nestjs/core';
import {TokenResponse} from '@core/auth/token-response';
import {UserInfo} from '@core/auth/user-info';
import {addSeconds} from 'date-fns';

@Component()
export class AuthService {

  constructor(private config: PrkConfig, private userService: UserService) {
  }

  async createToken(mail: string, userLevel: UserLevel): Promise<TokenResponse> {
    const expiresIn = this.config.runtimeConfiguration.jwtExpiresIn;
    const expiresAt = addSeconds(new Date(), expiresIn);
    const userInfo: UserInfo = {mail, userLevel, expiresAt};
    const token = jwt.sign(userInfo, this.config.runtimeConfiguration.jwtSecret, {expiresIn});
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async login(mail: string, password: string): Promise<TokenResponse> {
    const user: Partial<UserEntity> = await this.userService.getByMail(mail);
    const passwordMatch = await compareIt(password, user.password);
    if (!passwordMatch) {
      // throw new Error('Password incorrect');
      throw new HttpException('Password incorrect', 401);
    }
    return await this.createToken(user.mail, user.userLevel);
  }


  async register(mail: string, password: string): Promise<TokenResponse> {
    const user = await this.userService.register(mail, password);
    return this.createToken(user.mail, user.userLevel);
  }


  async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}
