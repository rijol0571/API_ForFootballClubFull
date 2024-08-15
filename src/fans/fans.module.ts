import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FansService } from './fans.service';
import { FansController } from './fans.controller';
import { Fan } from './models/fan.model';

@Module({
  imports: [TypeOrmModule.forFeature([Fan])],
  controllers: [FansController],
  providers: [FansService],
  exports: [FansService],
})
export class FansModule {}
