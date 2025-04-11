/* A JwtStrategy é responsável por extrair o token do cabeçalho Authorization
e verificar se ele é válido. Se for válido, o usuário estará disponível em
request.user.
*/

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // Extrai token do cabeçalho 'Authorization: Bearer <token>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'segredo_fixo',
    });
  }

  // Se o token for válido, o retorno do validate vira req.user
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, level: payload.level };
  }
}