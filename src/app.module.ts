import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from "./auth/auth.module"
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from "./ matches/matches.module"
import { TicketsModule } from './tickets/tickets.module';
import { ShoppingModule } from "./ shopping/shopping.module"
import { OrdersModule } from "./ orders/orders.module"
import { TrophiesModule } from './trophies/trophies.module';
import { FansModule } from './fans/fans.module';
import { NewsModule } from './news/news.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { DatabaseConfigService } from './config/database.config';
import { JwtConfigService } from './config/jwt.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // ConfigModule global qilib o'rnatilgan
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: DatabaseConfigService,  // DatabaseConfigService ni TypeORM bilan bog'lash
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: JwtConfigService,  // JwtConfigService ni JWT konfiguratsiyasi bilan bog'lash
    }),
    AuthModule,
    TeamsModule,
    PlayersModule,
    MatchesModule,
    TicketsModule,
    ShoppingModule,
    OrdersModule,
    TrophiesModule,
    FansModule,
    NewsModule,
    SponsorsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

