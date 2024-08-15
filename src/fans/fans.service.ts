import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fan } from './models/fan.model';
import { CreateFanDto, UpdateFanDto } from "./dto/ fan.dto"


@Injectable()
export class FansService {
  constructor(
    @InjectRepository(Fan)
    private readonly fanRepository: Repository<Fan>,
  ) {}

  async create(createFanDto: CreateFanDto): Promise<Fan> {
    const fan = this.fanRepository.create(createFanDto);
    return this.fanRepository.save(fan);
  }

  async findAll(): Promise<Fan[]> {
    return this.fanRepository.find();
  }

  async findOne(id: string): Promise<Fan> {
    const fan = await this.fanRepository.findOne({ where: { id } });
    if (!fan) {
      throw new NotFoundException(`Fan with ID ${id} not found`);
    }
    return fan;
  }

  async findByEmail(email: string): Promise<Fan> {
    const fan = await this.fanRepository.findOne({ where: { email } });
    if (!fan) {
      throw new NotFoundException(`Fan with email ${email} not found`);
    }
    return fan;
  }

  async findById(id: string): Promise<Fan> {
    return this.findOne(id); // findOne metodidan foydalanamiz
  }

  async update(id: string, updateFanDto: UpdateFanDto): Promise<Fan> {
    const fan = await this.fanRepository.preload({
      id,
      ...updateFanDto,
    });
    if (!fan) {
      throw new NotFoundException(`Fan with ID ${id} not found`);
    }
    return this.fanRepository.save(fan);
  }

  async remove(id: string): Promise<void> {
    const result = await this.fanRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fan with ID ${id} not found`);
    }
  }
}

