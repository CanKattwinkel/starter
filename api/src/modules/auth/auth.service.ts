import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {PrkConfig} from '../config/config.model';

@Component()
export class AuthService {

    constructor(private config: PrkConfig) {
    }

    async createToken() {
        const expiresIn = 60 * 60;
        const user = {email: 'thisis@example.com'};
        const token = jwt.sign(user, this.config.runtimeConfiguration.jwtSecret, {expiresIn: this.config.runtimeConfiguration.jwtExpiresIn});
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        // put some validation logic here
        // for example query user by id / email / username
        return true;
    }
}
