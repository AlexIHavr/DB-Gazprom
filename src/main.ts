import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AllExceptionsFilter } from 'common/filters/allExceptions.filter';

import { AppModule } from './app.module';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = process.env.GLOBAL_PREFIX;

  app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(json({ limit: process.env.MAX_REQUEST_SIZE }));

  if (globalPrefix) app.setGlobalPrefix(globalPrefix);

  await app.listen(process.env.PORT ?? 5000);
})();
