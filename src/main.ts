import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constans';
import * as Sentry from "@sentry/node";
import { HttpExceptionFilter } from './common/filters/http-error.filter';
import { generateTypeormConfigFile } from './scripts';
import { ValidationPipe } from '@nestjs/common';
import { ValidationPipeError } from './common/pipes/validation.pipe';
const moment = require('moment-timezone')

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT);
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipeError());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  moment.tz.setDefault(configService.get('TZ'));
  
  generateTypeormConfigFile(config);

  app.useGlobalFilters(new HttpExceptionFilter());

  Sentry.init({
    dsn: "https://241c1be60e15403780bbb5146efce61f@o1040273.ingest.sentry.io/6009310",

    tracesSampleRate: 1.0
  });
  await app.listen(port);

}
bootstrap();

