import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenBlacklist } from './entity/TokenBlacklist'; // TokenBlacklist entitiy import qiling
import { FansService } from '../fans/fans.service';
import { Fan } from '../fans/models/fan.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenBlacklist, Fan]), // TokenBlacklist entitiy-ni qo'shing
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, FansService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
