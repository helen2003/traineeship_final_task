import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketResolver } from './basket.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [BasketResolver, BasketService, PrismaService],
  imports: [UsersModule]
})
export class BasketModule {}
