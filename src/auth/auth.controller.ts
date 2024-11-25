import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { TokenInterface } from './interface/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Идентификация и аутентификация' })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/login')
  login(@Body() authDto: AuthUserDto): Promise<TokenInterface> {
    return this.authService.login(authDto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<TokenInterface> {
    return this.authService.registration(userDto);
  }
}
