import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_LEVEL_KEY } from '../decorators/required-level.decorator';

@Injectable()
export class LevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Método principal que verifica se o usuário tem o nível necessário para acessar a rota
   * @param context Contexto de execução contendo informações da requisição
   * @returns boolean Indicando se o acesso é permitido (true) ou não (false)
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredLevel = this.reflector.get<number>(REQUIRED_LEVEL_KEY, context.getHandler());
    
    // Se a rota não tiver nível definido, não bloqueia o acesso
    if (!requiredLevel) {
      return true;
    }

    // Obtém o objeto de requisição HTTP
    const request = context.switchToHttp().getRequest();
    
    // "user" vem do validate() da JwtStrategy (já validado pelo JwtAuthGuard)
    const user = request.user;

    // Verifica se o nível do usuário é suficiente
    if (user.level < requiredLevel) {
      throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
    }
    
    return true;
  }
}