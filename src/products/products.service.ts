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
    this.fileService.updateIdProductFile(addFilesData.image, product.id); // впринцепи все ок, только лучше не image, а file_id указать. Фронтам так понятнее
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
    // Не правильно, нужено делать запрос на количество
    // У нас же стоит take, соответсвенно сколько take, столько и длина массива. А нам нужна общая длина без take
    const totalCount = products.length 
    return {totalCount: totalCount, Products: products}
  }

  //Зачем поиск категории находится в product.service
  async findCategory(categoryId: number): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        id: categoryId,
      },
    });
  }

  //Зачем поиск файла находится в product.service
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
