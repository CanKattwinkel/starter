import {Controller, Delete, Get, Param, Req} from '@nestjs/common';
import {Request} from 'express';
import {UserEntity} from '../user/user.entity';
import {SessionService} from './session.service';
import {SessionEntity} from './session.entity';


@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {
  }


  @Get()
  public async renewal(@Req() req: Request): Promise<SessionEntity[]> {
    return await this.sessionService.get(req.user as UserEntity);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: number) {
    return await this.sessionService.remove(id);
  }

}
