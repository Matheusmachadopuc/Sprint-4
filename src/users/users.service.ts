// Contém a lógica de negócio para os usuários, a comunicação com o banco de dados (PrismaService) e as regras de negócio específicas da funcionalidade.
// "Repository + use-case"

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
    });
}

  // READ
  async findAll() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
    });
}

  async findOne(id: string) {
    return this.prisma.user.findFirst({ 
        where: { id, deletedAt: null }, 
    });
}
  async findOneByEmail(email: string) {
    return this.prisma.user.findFirst({
        where: { email, deletedAt: null },
    });
  }

  // UPDATE
  async update(id: string, updateUserDto: UpdateUserDto) {
    const { level, ...rest } = updateUserDto
    if (rest.password) {
      rest.password = await bcrypt.hash(rest.password, 10);
    }

    return await this.prisma.user.update({
        where: { id },
        data: rest,
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