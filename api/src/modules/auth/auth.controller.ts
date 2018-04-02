import {Body, Controller, Get, Post, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post()
    public async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
        return await this.authService.login(loginDto.mail, loginDto.password);
    }

    @Get('authorized')
    public async authorized() {
        console.log('Authorized route...');
    }
}
