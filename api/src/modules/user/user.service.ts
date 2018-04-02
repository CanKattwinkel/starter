import {Component} from '@nestjs/common';
import {UserEntity} from './user.entity';
import {UserRepo} from './user-repository.provider';
import {HttpException} from '@nestjs/core';

@Component()
export class UserService {


    constructor(private userRepo: UserRepo) {
    }

    async getByMail(mail): Promise<Partial<UserEntity>> {
        const user = await this.userRepo.findOne({select: ['mail', 'password', 'userLevel'], where: {mail}});
        if (!user) {
            throw new HttpException(`Couldn't find user for mail: '${mail}'`, 401);
        }
        return user;
    }

}
