import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { TokenInterface } from './interface/token.interface';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { JwtPayloadInterface } from './interface/JwtPayload.interface';
import { UserModel } from 'src/users/model/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: UserModel): Promise<TokenInterface> {
    return this.getTokens({
      sub: user.id,
      login: user.login,
      email: user.email,
      role: user.role,
    });
  }

  async registration(userDto: CreateUserDto): Promise<TokenInterface> {
    const user = await this.userService.createUser(userDto);
    return this.getTokens({
      sub: user.id,
      login: user.login,
      email: user.email,
      role: user.role,
    });
  }

  async getTokens(user: JwtPayloadInterface): Promise<TokenInterface> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(user, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(user, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokenInterface> {
    const user = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    return this.getTokens({
      sub: user.sub,
      login: user.login,
      email: user.email,
      role: user.role,
    });
  }

  async validateUser(userDto: AuthUserDto): Promise<User> {
    const user = await this.userService.getUserByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!user || !passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
    return user;
  }
}
