import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { File } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  private writeFile(buffer): string {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(file: Express.Multer.File): Promise<File> {
    const fileName = this.writeFile(file.buffer);
    return this.prisma.file.create({
      data: { url: fileName },
    });
  }

  async createMany(files: Array<Express.Multer.File>): Promise<File[]> {
    let namesFiles = [];
    for (var file of files) {
      namesFiles.push({ url: this.writeFile(file.buffer) });
    }
    return this.prisma.file.createManyAndReturn({
      data: namesFiles,
    });
  }

  async updateIdProductFile(
    fileId: Array<number>,
    idProduct: number,
  ): Promise<number> {
    const updateCount = await this.prisma.file.updateMany({
      where: {
        id: {
          in: fileId,
        },
      },
      data: {
        productId: idProduct,
      },
    });
    return updateCount.count;
  }

  async delete(id: number) {
    return this.prisma.file.delete({
      where: {
        id: id,
      },
    });
  }
}
