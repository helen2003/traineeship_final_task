import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<Category> {
    const category = await this.prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    })
    if (category){
      throw new HttpException('Категория уже записана', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.category.create({ data: { name: name } });
  }

  async getAll(): Promise<Category[]> {
    return this.prisma.category.findMany({});
  }

  async update(id: number, name: string): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
