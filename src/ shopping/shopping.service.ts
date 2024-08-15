import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shopping } from "./ models/shopping.model"
import { CreateShoppingDto, UpdateShoppingDto } from "./ dto/shopping.dto"

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(Shopping)
    private readonly shoppingRepository: Repository<Shopping>,
  ) {}

  async create(createShoppingDto: CreateShoppingDto): Promise<Shopping> {
    const shopping = this.shoppingRepository.create(createShoppingDto);
    return this.shoppingRepository.save(shopping);
  }

  async findAll(): Promise<Shopping[]> {
    return this.shoppingRepository.find();
  }

  async findOne(id: string): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne({ where: {id},
    });
    if (!shopping) {
      throw new NotFoundException(`Shopping item with ID ${id} not found`);
    }
    return shopping;
  }

  async update(id: string, updateShoppingDto: UpdateShoppingDto): Promise<Shopping> {
    const shopping = await this.shoppingRepository.preload({
      id,
      ...updateShoppingDto,
    });
    if (!shopping) {
      throw new NotFoundException(`Shopping item with ID ${id} not found`);
    }
    return this.shoppingRepository.save(shopping);
  }

  async remove(id: string): Promise<void> {
    const result = await this.shoppingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Shopping item with ID ${id} not found`);
    }
  }
}
