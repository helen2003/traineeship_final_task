import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserResolver } from './users.resolver';

@Module({
  controllers: [],
  providers: [UsersService, PrismaService, UserResolver],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)]
})
export class UsersModule {}
