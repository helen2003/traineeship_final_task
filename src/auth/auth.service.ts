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
import { TokenInfoInterface } from './interface/tokenInfo.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(authDto: AuthUserDto): Promise<TokenInterface> {
    const user = await this.validateUser(authDto);
    return this.getTokens({
      sub: user.id,
      login: user.login,
      email: user.email,
      role: user.role,
    });
  }

  async registration(userDto: CreateUserDto): Promise<TokenInterface> {
    const candidate = await this.userService.getUserByEmail(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.createUser(userDto);

    return this.getTokens({
      sub: user.id,
      login: user.login,
      email: user.email,
      role: user.role,
    });
  }

  async getTokens(user: TokenInfoInterface): Promise<TokenInterface> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.sub,
          email: user.email,
          login: user.login,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.sub,
          email: user.email,
          login: user.login,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(userDto: AuthUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.login);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    console.log(user, passwordEquals);
    if (!user || !passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
    return user;
  }
}
