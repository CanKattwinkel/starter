import {MiddlewaresConsumer, Module, NestModule, RequestMethod,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './passport/jwt.strategy';
import {AuthController} from './auth.controller';
import {ConfigModule} from '../config/config.module';
import {UserModule} from '../user/user.module';
import {AuthMiddleware} from './auth.middleware';
import {SessionModule} from '../session/session.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    SessionModule,
  ],
  components: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {

  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(AuthMiddleware) // use class info https://github.com/nestjs/nest/issues/178
      .forRoutes({path: '/auth/authorized', method: RequestMethod.ALL});
  }
}
