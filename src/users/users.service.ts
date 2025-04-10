// Contém a lógica de negócio para os usuários, a comunicação com o banco de dados (PrismaService) e as regras de negócio específicas da funcionalidade.
// "Repository + use-case"

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
        data: createUserDto
    });
}

  // READ
  async findAll() {
    return this.prisma.user.findMany();
}

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ 
        where: { email } 
    });
}

  // UPDATE
  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
        where: { email },
        data: updateUserDto,
    });
  }

  // DELETE
  async removeByEmail(email: string) {
    return await this.prisma.user.delete({
        where: { email },
    });
}
}