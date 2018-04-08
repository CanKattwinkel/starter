import {Controller, Get, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';

@Controller()
export class AppController {
  @Get()
  root(@Req() req: Request, @Res() res: Response): string {
    console.log(req.user);
    return 'Hello World!';
  }
}
