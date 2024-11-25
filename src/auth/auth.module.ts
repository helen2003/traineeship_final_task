import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AccessTokenStrategy, RefreshTokenStrategy, ConfigService],
  exports: [AuthModule],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
    }),
  ],
})
export class AuthModule {}
