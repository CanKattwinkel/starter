import {MiddlewaresConsumer, Module, NestModule, RequestMethod,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './passport/jwt.strategy';
import {AuthController} from './auth.controller';
import {ConfigModule} from '../config/config.module';
import {UserModule} from '../user/user.module';
import {AuthMiddleware} from './auth.middleware';

@Module({
  imports: [
    ConfigModule,
    UserModule,
  ],
  components: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {


  // todo user level check - take a look here https://github.com/zelazna/NestAPI/blob/da1bfcd32223bcbec26e190aee4742430669927b/src/common/guards/roles.guard.ts
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(AuthMiddleware) // use class info https://github.com/nestjs/nest/issues/178
      .forRoutes({path: '/auth/authorized', method: RequestMethod.ALL});
  }
}
