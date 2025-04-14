// Responsável por gerenciar as rotas relacionadas às salas.
// Aqui são definidos os endpoints (POST, PUT, GET, PATCH) para a feature de salas.

import { Controller,Get, Post, Body, Put, Patch, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UseGuards } from '@nestjs/common';
import { LevelGuard } from '../auth/guards/level.guard';
import { AuthGuard } from '@nestjs/passport';
import { RequiredLevel } from '../auth/decorators/required-level.decorator';

@Controller('room')
@UseGuards(AuthGuard('jwt')) // verifica autenticação via JWT
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // CREATE 
  @Post()
  //(POST /room)
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  // READ 
  @Get()
  //(GET /room)
  async findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  //(GET /room/:id)
  async findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  @UseGuards(LevelGuard) // rota sensível
  @RequiredLevel(5) // só nível 5 pode atualizar sala
  //(PUT /room/:id)
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Patch(':id')
  @UseGuards(LevelGuard) // rota sensível
  @RequiredLevel(5) // só nível 5 pode bloquear/desbloquear sala
  //(PATCH /room/:id)
  async toggleBlock(@Param('id') id: string) {
    return this.roomsService.toggleBlock(id);
  }
}

