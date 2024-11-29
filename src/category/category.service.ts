import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCategoryInput } from './dto/input/create-category.input';
import { UpdateCategoryInput } from './dto/input/update-category.input';
import { DeleteСategoryArgs } from './dto/args/delete-category.args';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    createCategoryData: CreateCategoryInput,
  ): Promise<Category> {
    return await this.prisma.category.create({ data: createCategoryData });
  }

  async getAllCategory(): Promise<Category[]> {
    return await this.prisma.category.findMany({}); //this.prisma.category.findMany() можно просто вот так указать
  }

  async updateCategory(
    updateCategoryData: UpdateCategoryInput,
  ): Promise<Category> {
    return await this.prisma.category.update({
      where: {
        id: updateCategoryData.id,
      },
      data: {
        name: updateCategoryData.name,
        update_at: new Date(),
      },
    });
  }

  async deleteCategory(deleteCategoryArgs: DeleteСategoryArgs) {
    return await this.prisma.category.delete({
      where: {
        id: deleteCategoryArgs.id,
      },
    });
  }
}
