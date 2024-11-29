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
    private prisma: PrismaService,   //вызываешь призму но нигде не используешь
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(authDto: AuthUserDto): Promise<TokenInterface> {
    const user = await this.validateUser(authDto); //вызов валидации лучше засунуть в гварду
    return this.getTokens({
      sub: user.id,
      login: user.login,
      email: user.email,
      role: user.role,
    });
  }

  async registration(userDto: CreateUserDto): Promise<TokenInterface> {
    /*
    Во-первых, почему ты делаешь поиск по login, но вызываешь методов по поиску email
    Во-вторых, блок с candidate лучше вынести в createUser, здесь в регистраци она смотрится не совсем корректно
    */
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
      //Можешь делать вызов просто this.jwtService.signAsync(user (лучше назвать payload), {...options})
      this.jwtService.signAsync(user,
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(user,
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

  //если будет вызывать его в гварде, то стоит убрать private
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
