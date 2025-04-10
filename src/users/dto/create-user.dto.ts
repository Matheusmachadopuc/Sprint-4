// Define a estrutura dos dados esperados ao criar um usuário, com validações (usando class-validator).
import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
  
  @IsNotEmpty()
  @IsInt()
  level: number;
  
  @IsNotEmpty()
  @IsString()
  profile_img: string; 
}