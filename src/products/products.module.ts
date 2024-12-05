import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ProductsResolver, ProductsService, PrismaService],
  imports: [FilesModule]
})
export class ProductsModule {}
