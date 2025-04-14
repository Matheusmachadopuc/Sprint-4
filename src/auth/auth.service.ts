import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class AuthService {
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
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Compara a senha em texto plano com a senha armazenada (hasheada) usando bcrypt.compare.
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
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


async register(dto: CreateUserDto) {
  const userExists = await this.usersService.findOneByEmail(dto.email);
  if (userExists) {
    throw new BadRequestException('E-mail já cadastrado');
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user = await this.usersService.create({
    name: dto.name,
    email: dto.email,
    password: hashedPassword,
    level: dto.level,
    profile_img: dto.profile_img,
  });

  return {
    message: 'Usuário criado com sucesso!',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
}