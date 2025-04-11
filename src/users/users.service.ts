// Contém a lógica de negócio para os usuários, a comunicação com o banco de dados (PrismaService) e as regras de negócio específicas da funcionalidade.
// "Repository + use-case"

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
        data: createUserDto
    });
}

  // READ
  async findAll() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
    });
}

  async findOne(id: string) {
    return this.prisma.user.findUnique({ 
        where: { id, deletedAt: null }, 
    });
}
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
        where: { email, deletedAt: null },
    });
  }

  // UPDATE
  async update(id: string, updateUserDto: UpdateUserDto) {
    const { level, ...data } = updateUserDto
    return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
    });
  }

  async updateLevel(id: string, updateLevelDto: UpdateLevelDto) {
    return await this.prisma.user.update({
        where: { id },
        data: { level: updateLevelDto.level },
    });
  }

  // DELETE
  async remove(id: string) {
    return await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
}
}