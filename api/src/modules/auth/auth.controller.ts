import {Body, Controller, Get, Post, Req, Res, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from './login.dto';
import {RegisterDto} from './register.dto';
import {Request, Response} from 'express';
import {cookieNameJwt} from '@core/auth/xsrf-token';
import {UserEntity} from '../user/user.entity';
import {extractJwt} from '../../utils/extract-jwt';
import {LoginInfo} from '@core/auth/user-info';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post()
  public async login(@Body(new ValidationPipe()) loginDto: LoginDto, @Res() res: Response, @Req() req: Request) {
    const serverOnlyTokenInfo = await this.authService.login(loginDto.mail, loginDto.password, req);
    res.cookie(cookieNameJwt, serverOnlyTokenInfo.access_token, {maxAge: 900000000000, httpOnly: true});
    const response: LoginInfo = {
      refreshToken: serverOnlyTokenInfo.session.token,
      tokenResponse: serverOnlyTokenInfo.tokenResponse,
    };
    res.json(response);
  }

  @Post('/refurbishment')
  public async refurbishment(@Req() req: Request, @Res() res: Response, @Body() payload: { refreshToken: string }) {
    const serverOnlyTokenInfo = await this.authService.refurbishment(payload.refreshToken);
    res.cookie(cookieNameJwt, serverOnlyTokenInfo.access_token, {maxAge: 900000000000, httpOnly: true});
    res.json(serverOnlyTokenInfo.tokenResponse);
  }


  @Post('/register')
  public async register(@Body(new ValidationPipe()) registerDto: RegisterDto, @Res() res: Response, @Req() req: Request) {
    const serverOnlyTokenInfo = await this.authService.register(registerDto.mail, registerDto.password, req);
    res.cookie(cookieNameJwt, serverOnlyTokenInfo.access_token, {maxAge: 900000000000, httpOnly: true});
    res.json(serverOnlyTokenInfo.tokenResponse);
  }


  @Get('/authorized/renewal')
  public async renewal(@Req() req: Request, @Res() res: Response) {
    const unverifiedToken = extractJwt(req);
    const serverOnlyTokenInfo = await this.authService.renewal(req.user as UserEntity, unverifiedToken);
    res.cookie(cookieNameJwt, serverOnlyTokenInfo.access_token, {maxAge: 900000000000, httpOnly: true});
    res.json(serverOnlyTokenInfo.tokenResponse);
  }

  @Get('authorized')
  public async authorized(@Req() req: Request) {
    console.log('Authorized route...');
    console.log(req.user);
  }
}
