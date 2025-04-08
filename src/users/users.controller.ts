// Responsável por gerenciar as rotas relacionadas aos usuários. 
// Aqui são definidos os endpoints (POST, GET, PUT, DELETE) para a feature de usuário.

import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // READ
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  // UPDATE
  @Put(':email')
  async updateByEmail(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateByEmail(email, updateUserDto);
  }

  // DELETE
  @Delete(':email')
  async removeByEmail(@Param('email') email: string) {
    return this.usersService.removeByEmail(email);
  }
}