# Database Migration
We use typeorm with the typeorm cli in order to run migrations. Edit any entity file or create a new one. Then let typeorm-cli figure out the required database changes - usually there is no need for writing any SQL within this project.

## Generate Migration File
Careful when choosing your migrations name - it will be used to name a class. Therefore '-' are not allowed. Use camel-case instead. 

`yarn migrate:generate -n MigrationName`

Hint: This only creates a migration instruction in `./api/src/migrations`. You need to actually run this migration in order to apply the changes to the database.

## Run the Migration
This runs all migrations that have not been yet applied to the database.

`yarn migrate:run`

