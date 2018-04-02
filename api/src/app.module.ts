import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './modules/auth/auth.module';

@Module({
    imports: [
        AuthModule,
    ],
  controllers: [AppController],
  components: [],
})
export class AppModule {}
