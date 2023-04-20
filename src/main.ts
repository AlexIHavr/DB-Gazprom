import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/allExceptions.filter';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(json({ limit: process.env.MAX_REQUEST_SIZE }));

  await app.listen(process.env.PORT);
})();
