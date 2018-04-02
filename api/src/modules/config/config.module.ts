import {Module} from '@nestjs/common';
import {configProviders} from './config.providers';

@Module({
  components: [
    ...configProviders,
  ],
  exports: [
    ...configProviders
  ],
  modules: [
  ]
})
export class ConfigModule {
}
