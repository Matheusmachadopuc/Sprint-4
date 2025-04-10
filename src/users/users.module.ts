// Define o módulo do NestJS para a feature de usuários, reunindo o controller e o service e possibilitando a injeção de dependências. 
// Esse módulo pode ser importado no módulo principal da aplicação (app.module.ts) para integrar a funcionalidade de usuários à aplicação completa.

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}