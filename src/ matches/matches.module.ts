import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from "./ models/match.model"

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
