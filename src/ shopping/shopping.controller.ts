import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ShoppingService } from './shopping.service';
import { CreateShoppingDto, UpdateShoppingDto } from "./ dto/shopping.dto"

@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @Post()
  async create(@Body() createShoppingDto: CreateShoppingDto) {
    return this.shoppingService.create(createShoppingDto);
  }

  @Get()
  async findAll() {
    return this.shoppingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.shoppingService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateShoppingDto: UpdateShoppingDto) {
    return this.shoppingService.update(id, updateShoppingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.shoppingService.remove(id);
  }
}
