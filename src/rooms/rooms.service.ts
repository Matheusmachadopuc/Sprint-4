// Contém a lógica de negócio para as salas, a comunicação com o banco de dados (PrismaService) e as regras de negócio específicas da funcionalidade.
// "Repository + use-case"

import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async create(createRoomDto: CreateRoomDto) {
    return await this.prisma.room.create({
        data: createRoomDto
    });
}

  // READ
  async findAll() {
    return await this.prisma.room.findMany({   
});
}

  async findOne(id: string) {
    return await this.prisma.room.findUnique({
        where: { id },
    });
}

  // UPDATE
  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return await this.prisma.user.update({
        where: { id },
        data: updateRoomDto,
    });
  }

  async toggleBlock(id: string) {
    const room = await this.prisma.room.findUnique({ where: { id } });
    return this.prisma.room.update({
      where: { id },
      data: { isBlocked: !room.isBlocked },
    });
  }

  async enterRoom(userId: string, roomId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const room = await this.prisma.room.findUnique({ where: { id: roomId } });

    if (user.level < room.accessLevel) {
      throw new ForbiddenException('Nível insuficiente para acessar esta sala.');
    }

    return 'Acesso permitido!';
  }
}