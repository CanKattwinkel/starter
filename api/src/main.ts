import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

const packageJson: { version: string } = require('./../package.json');

/**
 * In order to add ordinary express middlewares: */
function expressFactory() {
  const app = express();
  app.use(cookieParser());
  return app;
}

async function bootstrap() {

  const server = await NestFactory.create(AppModule, expressFactory(), {});

  const options = new DocumentBuilder()
    .setTitle('Parkspot API Documentation')
    .setDescription('The (Germans) API Documentation for the parkspot project')
    .setVersion(packageJson.version)
    .addTag('parkspot')
    .build();

  const document = SwaggerModule.createDocument(server, options);
  SwaggerModule.setup('/api', server, document);

  await server.listen(3000);
}

bootstrap();
