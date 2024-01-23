import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './shared/utilities/exceptionFilter';
const ALLOWED_METHODS: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const corsOption = Object.freeze({
  origin: '*', // Add your allowed IP addresses and ports
  methods: ALLOWED_METHODS,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsOption);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3500);
}
bootstrap();
