import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateLevelDto {
  @IsNotEmpty()
  @IsInt()
  level: number;
}