

## Prerequisites

- NodeJS (https://nodejs.org/en/download/)
- npm (installed with nodejs - please do not use npm directly but yarn) 
- yarn (`npm i -g yarn`)
- Angular CLI (`yarn global add @angular/cli`)
- VirtualBox
- Vagrant

## How do you turn this on?


- Database `cd env`
    1. Start Database: `vagrant up` 
- Client `cd client`
    1. Install dependencies with `yarn`
    1. Copy i18n config `./client/xliffmerge.template.json` -> `./client/xliffmerge.json` and add Google Translate API key
    1. Start development server with `yarn start`
    1. (Optional): Run Tests in Background (watch) `yarn test` 
- API Server `cd api`
    1. Install dependencies with `yarn`
    1. Copy Configuration Template files 
        1. `./api/ormconfig.sample.json` -> `./api/ormconfig.json`
        1. `./api/config.sample.json` -> `./api/config.json`
    1. Run the database migration once `yarn migrate:run`
    1. Start development server with `yarn start`
    1. (Optional): Run Tests in Background (watch) `yarn test` 

Now see the application under: http://localhost:4200
