import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface RuntimeConfiguration {
    environment: 'dev' | ' prod';
}

export interface DBConfig extends PostgresConnectionOptions {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean,
}


export class PrkConfig {
    dbConfig: DBConfig;
    runtimeConfiguration: RuntimeConfiguration;
}


