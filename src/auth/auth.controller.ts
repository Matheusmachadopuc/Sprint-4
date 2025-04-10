import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    // Valida credenciais
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    // Retorna um token JWT
    return this.authService.login(user);
  }
}