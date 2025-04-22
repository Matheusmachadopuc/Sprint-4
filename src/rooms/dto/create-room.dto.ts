// Define a estrutura dos dados esperados ao criar uma sala, com validações (usando class-validator).
import { IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsNotEmpty()
  @IsInt()
  accessLevel: number;

  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;
}