import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { TrophiesService } from './trophies.service';
import { CreateTrophyDto, UpdateTrophyDto } from './dto/trophy.dto';

@Controller('trophies')
export class TrophiesController {
  constructor(private readonly trophiesService: TrophiesService) {}

  @Post()
  async create(@Body() createTrophyDto: CreateTrophyDto) {
    return this.trophiesService.create(createTrophyDto);
  }

  @Get()
  async findAll() {
    return this.trophiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trophiesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTrophyDto: UpdateTrophyDto) {
    return this.trophiesService.update(id, updateTrophyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trophiesService.remove(id);
  }
}
