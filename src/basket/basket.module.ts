import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketResolver } from './basket.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [BasketResolver, BasketService, PrismaService],

})
export class BasketModule {}
