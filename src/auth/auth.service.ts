import { Injectable, UnauthorizedException, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  /**
   * Usa o UsersService para buscar o usuário por email.
   * Valida credenciais do usuário (email e senha).
   * Se estiverem certas, retorna o usuário, se não, lança exceção (throw).
   */
  async validateUser(email: string, plainPassword: string) {
    this.logger.log(`Validando usuário para email: ${email}`);
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      this.logger.error('Usuário não encontrado');
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Compara a senha em texto plano com a senha armazenada (hasheada) usando bcrypt.compare.
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    this.logger.log(`Senha válida: ${isPasswordValid}`);
    if (!isPasswordValid) {
      this.logger.error('Senha incorreta');
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user;
  }

  /**
   * Gera um token JWT a partir de parte dos dados do usuário.
   * Recebe o objeto user já validado, cria um payload com informações básicas (id, email, level) e assina o token usando this.jwtService.sign(payload).
   */
  async login(user: any) {
    const payload = { sub: user.id, email: user.email, level: user.level };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const token = crypto.randomBytes(32).toString('hex');
    
    await this.prisma.passwordReset.create({
      data: { userId: user.id, token, expiresAt: new Date(Date.now() + 3600000) },
    });

   
    await this.mailService.sendMail({
      to: email,
      subject: 'Redefinição de Senha',
      text: `Use este token para redefinir sua senha: ${token}`,
    });

    return 'Token enviado por e-mail.';
  }
}