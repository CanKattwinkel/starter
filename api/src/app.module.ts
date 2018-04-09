import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './modules/auth/auth.module';
import {UserModule} from './modules/user/user.module';
import {UserMiddleware} from './modules/user/user.middleware';
import {ConfigModule} from './modules/config/config.module';
import {ParkspotModule} from './modules/parkspot/parkspot.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule,
    ParkspotModule,
  ],
  controllers: [AppController],
  components: [],
})
export class AppModule implements NestModule {

  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({path: '**', method: RequestMethod.ALL}); // todo ? /auth/authorized
  }
}
