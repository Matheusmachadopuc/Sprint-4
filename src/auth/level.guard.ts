import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_LEVEL_KEY } from './required-level.decorator';

@Injectable()
export class LevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredLevel = this.reflector.get<number>(REQUIRED_LEVEL_KEY, context.getHandler());
    if (!requiredLevel) {
      return true; // se a rota não tiver nível definido, não bloqueia
    }

    const request = context.switchToHttp().getRequest();
    // "user" vem do validate() da JwtStrategy
    const user = request.user;

    if (user.level < requiredLevel) {
      throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
    }
    
    return true;
  }
}