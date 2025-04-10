import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa validação global
  app.useGlobalPipes(new ValidationPipe());

  // Ativa o guard JWT como padrão global
  app.useGlobalGuards(new (AuthGuard('jwt'))());

  await app.listen(3000);
}
bootstrap();
