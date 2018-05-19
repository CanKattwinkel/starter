import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ConfigModule} from '../config/config.module';
import {sessionRepoProvider} from './session-repository.provider';
import {SessionService} from './session.service';
import {SessionController} from './session.controller';

@Module({
  modules: [
    DatabaseModule,
    ConfigModule,
  ],
  controllers: [
    SessionController,
  ],
  components: [
    sessionRepoProvider,
    SessionService,
  ],
  exports: [
    sessionRepoProvider,
    SessionService,
  ]
})
export class SessionModule {
}
