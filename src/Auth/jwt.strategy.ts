import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { FansService } from '../fans/fans.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly fansService: FansService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const fan = await this.fansService.findOne(payload.id); // findById metodi
    if (!fan) {
      throw new UnauthorizedException('Fan not found');
    }
    return { id: fan.id }; // req.fan uchun ma'lumot qaytarish
  }
}
