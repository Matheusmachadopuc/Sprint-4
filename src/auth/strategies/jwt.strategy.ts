/* 
 * A JwtStrategy é responsável por extrair o token do cabeçalho Authorization
 * e verificar se ele é válido. Se for válido, o usuário estará disponível em
 * request.user.
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // Extrai token do cabeçalho 'Authorization: Bearer <token>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // Não ignora a expiração - tokens expirados serão rejeitados
      ignoreExpiration: false,
      
      // Chave secreta do .env ou valor fixo para desenvolvimento
      secretOrKey: configService.get<string>('JWT_SECRET') || 'segredo_fixo',
      
      // Tempo de tolerância para expiração (em segundos)
      clockTolerance: 30,
    });
  }

  /**
   * Se o token for válido, o retorno do validate vira req.user
   * @param payload Conteúdo decodificado do token JWT
   * @returns Objeto que será injetado em request.user
   * @throws UnauthorizedException Se o payload for inválido
   */
  async validate(payload: JwtPayload) {
    // Validação mínima do payload preservando a simplicidade original
    if (!payload.sub || !payload.email || payload.level === undefined) {
      throw new UnauthorizedException('Token inválido: estrutura incorreta');
    }

    // Retorna apenas os dados necessários para evitar poluição do req.user
    return { 
      id: payload.sub, 
      email: payload.email, 
      level: payload.level 
    };
  }
}