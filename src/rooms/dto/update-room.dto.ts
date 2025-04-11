// Define os dados que podem ser alterados ao atualizar uma sala.
// Importa a classe PartialType do NestJS para criar um DTO de atualização baseado em outro DTO.
// O PartialType transforma todas as propriedades de CreateRoomDto em opcionais.

import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}