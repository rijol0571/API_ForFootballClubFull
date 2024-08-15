import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { FansService } from '../fans/fans.service'; // FansService import qilinadi
import { Fan } from '../fans/models/fan.model'; // Fan modeli import qilinadi
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { TokenBlacklist } from './entity/TokenBlacklist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly fansService: FansService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(TokenBlacklist)
    private readonly tokenBlacklistRepository: Repository<TokenBlacklist>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, name, role } = signUpDto;
    const fanExists = await this.fansService.findByEmail(email); // 'findByEmail' metodidan foydalaning

    if (fanExists) {
      throw new ConflictException('Email already exists. Go to SignIn.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFan = await this.fansService.create({
      name,
      email,
      password: hashedPassword,
      // role maydoni 'CreateFanDto' da mavjud emas, shuning uchun olib tashlandi
    });

    const tokens = await this.getTokens(newFan);
    return { fan: newFan, ...tokens };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const fan = await this.fansService.findByEmail(email);
    if (!fan || !(await bcrypt.compare(password, fan.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(fan);
    return { fan, ...tokens };
  }

  async refreshToken(refreshToken: string) {
    try {
      const { id } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const fan = await this.fansService.findOne(id); // findById o'rniga findOne
      const tokens = await this.getTokens(fan);
      return { fan, ...tokens };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    try {
      // Tokenni blacklistga qo'shish
      await this.tokenBlacklistRepository.save({ token: userId });
      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to log out');
    }
  }

  private async getTokens(fan: Fan) {
    const payload = { id: fan.id, email: fan.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '3d',
    });

    return { accessToken, refreshToken };
  }
}


