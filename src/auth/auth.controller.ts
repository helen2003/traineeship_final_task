import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { TokenInterface } from './interface/token.interface';
import { RegistationDto } from './dto/registation-dto.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/common/guards/localAuthGuard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/login')
  login(@Request() req): Promise<TokenInterface> {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/registration')
  registration(@Body() userDto: RegistationDto): Promise<TokenInterface> {
    return this.authService.registration(userDto);
  }
}
