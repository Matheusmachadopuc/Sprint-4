import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para autenticação de usuários
   * @param loginDto Objeto contendo email e senha
   * @returns TokenDto com o token JWT
   * @throws UnauthorizedException Se as credenciais forem inválidas
   */
  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    try {
      // Valida credenciais usando o AuthService
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );

      if (!user) {
        // Se as credenciais forem inválidas, lança erro 401
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Gera e retorna um token JWT válido
      return await this.authService.login(user);
    } catch (error) {
      // Mantém o mesmo comportamento de lançar UnauthorizedException
      throw new UnauthorizedException(
        error.message || 'Falha na autenticação',
      );
    }
  }
}