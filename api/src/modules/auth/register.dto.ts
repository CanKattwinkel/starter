import {IsEmail} from '../../../node_modules/@nestjs/common/node_modules/class-validator';
import {IsString} from 'class-validator';

export class RegisterDto {

    @IsString()
    @IsEmail()
    mail: string;

    @IsString()
    password: string;
}

