import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa validação global
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

console.info(
  `Server is running on http://localhost:3000\n`,
)
}

bootstrap();
