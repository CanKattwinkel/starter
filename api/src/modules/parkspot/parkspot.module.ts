import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ConfigModule} from '../config/config.module';
import {parkspotRepoProvider} from './parkspot-repository.provider';
import {ParkspotService} from './parkspot.service';
import {ParkspotController} from './parkspot.controller';

@Module({
  modules: [
    DatabaseModule,
    ConfigModule,
  ],
  controllers: [
    ParkspotController,
  ],
  components: [
    parkspotRepoProvider,
    ParkspotService,
  ],
  exports: [
    parkspotRepoProvider,
    ParkspotService,
  ]
})
export class ParkspotModule {
}
