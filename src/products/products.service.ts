import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductInput } from './dto/input/create-product.input';
import { Category, File, Product } from '@prisma/client';
import { UpdateProductInput } from './dto/input/update-product.input';
import { FilesService } from 'src/files/files.service';
import { AddFilesInput } from './dto/input/add-files.input';
import { GetProductArgs } from './dto/args/product-find-all.args';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private fileService: FilesService,
  ) {}

  async create(
    createProductData: CreateProductInput,
    addFilesData: AddFilesInput,
  ): Promise<Product> {
    const product = await this.prisma.product.create({
      data: createProductData,
    });
    this.fileService.updateIdProductFile(addFilesData.image, product.id);
    return product;
  }

  async findOne(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAll(findAllArgs: GetProductArgs) {
    const products = await this.prisma.product.findMany({
      skip: findAllArgs.skip,
      take: findAllArgs.take,
      where: {
        AND: [
          {
            name: { contains: findAllArgs.search, mode: 'insensitive' },
          },
          {
            categoryId: findAllArgs.categoryId,
          },
        ],
      },
    });
    const totalCount = products.length
    return {totalCount: totalCount, Products: products}
  }

  async findCategory(categoryId: number): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        id: categoryId,
      },
    });
  }

  async findFiles(id: number): Promise<File[]> {
    return this.prisma.file.findMany({
      where: {
        productId: id,
      },
    });
  }

  async update(updateProductInput: UpdateProductInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id: updateProductInput.id },
      data: {
        ...updateProductInput,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
