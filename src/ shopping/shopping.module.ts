import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingService } from './shopping.service';
import { ShoppingController } from './shopping.controller';
import { Shopping } from "./ models/shopping.model"

@Module({
  imports: [TypeOrmModule.forFeature([Shopping])],
  controllers: [ShoppingController],
  providers: [ShoppingService],
  exports: [ShoppingService],
})
export class ShoppingModule {}
