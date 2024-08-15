import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './models/sponsor.model';
import { CreateSponsorDto, UpdateSponsorDto } from './dto/sponsor.dto';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>,
  ) {}

  async create(createSponsorDto: CreateSponsorDto): Promise<Sponsor> {
    const sponsor = this.sponsorRepository.create(createSponsorDto);
    return this.sponsorRepository.save(sponsor);
  }

  async findAll(): Promise<Sponsor[]> {
    return this.sponsorRepository.find();
  }

  async findOne(id: string): Promise<Sponsor> {
    const sponsor = await this.sponsorRepository.findOne({ where: { id },
    });
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
    return sponsor;
  }

  async update(id: string, updateSponsorDto: UpdateSponsorDto): Promise<Sponsor> {
    const sponsor = await this.sponsorRepository.preload({
      id,
      ...updateSponsorDto,
    });
    if (!sponsor) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
    return this.sponsorRepository.save(sponsor);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sponsorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sponsor with ID ${id} not found`);
    }
  }
}

