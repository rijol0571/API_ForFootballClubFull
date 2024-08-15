import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { FansService } from './fans.service';
import { CreateFanDto, UpdateFanDto } from "./dto/ fan.dto"

@Controller('fans')
export class FansController {
  constructor(private readonly fansService: FansService) {}

  @Post()
  async create(@Body() createFanDto: CreateFanDto) {
    return this.fansService.create(createFanDto);
  }

  @Get()
  async findAll() {
    return this.fansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fansService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFanDto: UpdateFanDto) {
    return this.fansService.update(id, updateFanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fansService.remove(id);
  }
}
