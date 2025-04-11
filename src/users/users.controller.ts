// Responsável por gerenciar as rotas relacionadas aos usuários. 
// Aqui são definidos os endpoints (POST, GET, PATCH, DELETE) para a feature de usuário.

import { ForbiddenException, Controller, Get, Post, Patch, Delete, Body, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { UseGuards } from '@nestjs/common';
import { LevelGuard } from '../auth/level.guard';
import { AuthGuard } from '@nestjs/passport';
import { RequiredLevel } from '../auth/required-level.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt')) // verifica autenticação via JWT
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE 
  @Post()
  @UseGuards(LevelGuard) // rota sensível
  @RequiredLevel(5) // só nível 5 pode criar usuário
  //(POST /users)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // READ 
  @Get()
  //(GET /users)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  //(GET /users/:id)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  //(PATCH /users/:id)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    const user = req.user;
    if (user.level < 5 && user.userId !== id) {
      throw new ForbiddenException('Você não tem permissão para atualizar este usuário');
    } 
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/level')
  @UseGuards(LevelGuard) // rota sensível
  @RequiredLevel(5) // só nível 5 pode atualizar level
  //(PATCH /users/:id/level)
  async updateLevel(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.usersService.update(id, updateLevelDto);
  }

  // DELETE
  @Delete(':id')
  @UseGuards(LevelGuard) // rota sensível
  @RequiredLevel(4) // só nível 4 ou 5 pode deletar usuário
  //(DELETE /users/:id)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}