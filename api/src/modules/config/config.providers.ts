import {readFileProm} from '../../utils/read-file-promise';
import {DBConfig, PrkConfig, RuntimeConfiguration} from './config.model';

// Either use the PRK_CONFIG_PATH value or use the folder in which the server was started.
const configPath = process.env.PRK_CONFIG_PATH || process.cwd();


const runtimeConfigPath = `${configPath}/config.json`;
const dbConfigPath = `${configPath}/ormconfig.json`;


/**
 * Loads the configuration and merges them into a single instance of PrkConfig */
async function loadConfiguration(): Promise<PrkConfig> {
    const runtimeConfiguration = await readFileProm<RuntimeConfiguration>(runtimeConfigPath);
    const dbConfig = await readFileProm<DBConfig>(dbConfigPath);
    return {runtimeConfiguration, dbConfig};
}

export const configProviders = [
    {
        provide: PrkConfig,
        useFactory: loadConfiguration
    },
];
