import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ConfigModule} from '../config/config.module';
import {userRepoProvider} from './user-repository.provider';

@Module({
    modules: [
        DatabaseModule,
        ConfigModule,
    ],
    controllers: [],
    components: [
        userRepoProvider,
    ],
    exports: [
        userRepoProvider,
    ]
})
export class UserModule {
}
