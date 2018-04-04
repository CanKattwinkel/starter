import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './modules/auth/auth.module';
import {UserModule} from './modules/user/user.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
    ],
  controllers: [AppController],
  components: [],
})
export class AppModule {}
