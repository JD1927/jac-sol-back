import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

export async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application Listening on port: ${port}`);
}
bootstrap();