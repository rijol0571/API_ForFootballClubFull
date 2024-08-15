import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrophiesService } from './trophies.service';
import { TrophiesController } from './trophies.controller';
import { Trophy } from "./ models/trophy.model"

@Module({
  imports: [TypeOrmModule.forFeature([Trophy])],
  controllers: [TrophiesController],
  providers: [TrophiesService],
  exports: [TrophiesService],
})
export class TrophiesModule {}
