import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NotFoundExceptionFilter } from './common/filters/not-found/not-found.exception.filter';
import { GlobalExceptionFilter } from './common/filters/global/global.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const logger = new Logger();
  app.useLogger(logger);

  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new GlobalExceptionFilter(),
  );

  app.enableCors();

  const documentConfig = new DocumentBuilder()
  .setTitle('Shorter Link')
  .setDescription('API documentation for Shorter link.')
  .setVersion('1.0')
  .addTag('Link')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup(config.get('app.swagger'), app, documentFactory, {
    jsonDocumentUrl: 'api-json'
  });

  await app.listen(config.get<number>('app.port'));
  const url = await app.getUrl();
  logger.log(`Application running on port ${url}`);
}
bootstrap();
