import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trophy } from "./ models/trophy.model"
import { CreateTrophyDto, UpdateTrophyDto } from './dto/trophy.dto';

@Injectable()
export class TrophiesService {
  constructor(
    @InjectRepository(Trophy)
    private readonly trophyRepository: Repository<Trophy>,
  ) {}

  async create(createTrophyDto: CreateTrophyDto): Promise<Trophy> {
    const trophy = this.trophyRepository.create(createTrophyDto);
    return this.trophyRepository.save(trophy);
  }

  async findAll(): Promise<Trophy[]> {
    return this.trophyRepository.find();
  }

  async findOne(id: string): Promise<Trophy> {
    const trophy = await this.trophyRepository.findOneBy({ id });
    if (!trophy) {
      throw new NotFoundException(`Trophy with ID ${id} not found`);
    }
    return trophy;
  }
  

  async update(id: string, updateTrophyDto: UpdateTrophyDto): Promise<Trophy> {
    const trophy = await this.trophyRepository.preload({
      id,
      ...updateTrophyDto,
    });
    if (!trophy) {
      throw new NotFoundException(`Trophy with ID ${id} not found`);
    }
    return this.trophyRepository.save(trophy);
  }

  async remove(id: string): Promise<void> {
    const result = await this.trophyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Trophy with ID ${id} not found`);
    }
  }
}
