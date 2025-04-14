import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @Expose()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token for authenticated requests',
  })
  access_token: string;

  @Expose()
  @ApiProperty({
    example: 3600,
    description: 'Token expiration time in seconds',
    required: false,
  })
  expires_in?: number;

  @Expose()
  @ApiProperty({
    example: 'bearer',
    description: 'Type of token',
    required: false,
  })
  token_type?: string;
}