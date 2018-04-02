import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {PrkConfig} from '../config/config.model';
import {UserService} from '../user/user.service';
import {UserEntity} from '../user/user.entity';
import {UserLevel} from '../user/user-level.enum';
import {compareIt} from '../../utils/encrypt';
import {HttpException} from '@nestjs/core';

@Component()
export class AuthService {

    constructor(private config: PrkConfig, private userService: UserService) {
    }

    async createToken(mail: string, userLevel: UserLevel) {
        const expiresIn = this.config.runtimeConfiguration.jwtExpiresIn;
        const user = {mail, userLevel};
        const token = jwt.sign(user, this.config.runtimeConfiguration.jwtSecret, {expiresIn});
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async login(mail: string, password: string) {
        const user: Partial<UserEntity> = await this.userService.getByMail(mail);
        const passwordMatch = await compareIt(password, user.password);
        if (!passwordMatch) {
            // throw new Error('Password incorrect');
            throw new HttpException('Password incorrect', 401);
        }
        return await this.createToken(user.mail, user.userLevel);
    }


    async validateUser(signedUser): Promise<boolean> {
        // put some validation logic here
        // for example query user by id / email / username
        return true;
    }
}
