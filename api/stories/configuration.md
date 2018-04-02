# Configuration

Due to typeorm's need of the ormconfig file we have two sources for config currently. They get merged in the config module as `PrkConfig` which provides the runtime config as well as the database configuration.
