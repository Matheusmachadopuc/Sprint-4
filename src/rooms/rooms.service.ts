// Contém a lógica de negócio para as salas, a comunicação com o banco de dados (PrismaService) e as regras de negócio específicas da funcionalidade.
// "Repository + use-case"

import { Injectable } from '@nestjs/common';
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
    // 1. Verificar a sala
    const room = await this.prisma.room.findUnique({ 
        where: { id } 
    });
    if (!room) 
        throw new Error('Sala não encontrada');
  
    // 2. Inverte o valor de is_blocked
    const newBlockedStatus = !room.is_blocked;
  
    // 3. Atualiza a sala
    return await this.prisma.room.update({
      where: { id },
      data: { is_blocked: newBlockedStatus },
    });
  }
}