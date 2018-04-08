import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

/**
 * In order to add ordinary express middlewares: */
function expressFactory() {
  const app = express();
  app.use(cookieParser());
  return app;
}

async function bootstrap() {
  const server = await NestFactory.create(AppModule, expressFactory(), {});
  await server.listen(3000);
}

bootstrap();
