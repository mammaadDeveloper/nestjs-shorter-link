import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NotFoundExceptionFilter } from './common/filters/not-found/not-found.exception.filter';
import { GlobalExceptionFilter } from './common/filters/global/global.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();
  app.useLogger(logger);

  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new GlobalExceptionFilter(),
  );

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  const url = await app.getUrl();
  logger.log(`Application running on port ${url}`);
}
bootstrap();
