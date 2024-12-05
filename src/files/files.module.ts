import { Global, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FilesResolver } from './files.resolver';

@Global()
@Module({
  controllers: [FilesController],
  providers: [FilesService, PrismaService, FilesResolver],
  exports: [FilesService],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
  ],
})
export class FilesModule {}
