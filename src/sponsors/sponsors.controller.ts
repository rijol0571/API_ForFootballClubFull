import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { CreateSponsorDto, UpdateSponsorDto } from './dto/sponsor.dto';

@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post()
  async create(@Body() createSponsorDto: CreateSponsorDto) {
    return this.sponsorsService.create(createSponsorDto);
  }

  @Get()
  async findAll() {
    return this.sponsorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sponsorsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSponsorDto: UpdateSponsorDto) {
    return this.sponsorsService.update(id, updateSponsorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sponsorsService.remove(id);
  }
}
