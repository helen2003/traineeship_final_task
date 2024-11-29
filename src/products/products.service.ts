import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductInput } from './dto/input/create-product.input';
import { Product } from '@prisma/client';
import { UpdateProductInput } from './dto/input/update-product.input';
import { FilterProductArgs } from './dto/args/product-filter.args';
import { PaginationProductArgs } from './dto/args/product-pagination.args';
import { GetProductArgs } from './dto/args/get-product.args';
import { DeleteProductArgs } from './dto/args/delete-product.args';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductData: CreateProductInput): Promise<Product> {
    return await this.prisma.product.create({ data: createProductData });
  }

  async findOneProduct(getProduct: GetProductArgs): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: {
        id: getProduct.id,
      },
    });
  }

  async paginationProducts( // наименование не подходи, ты можешь просто указать findAll()
    pagination: PaginationProductArgs,
  ): Promise<Product[] | null> { // он у тебя не вернет Null, если товаров нет, он вернет пустой []
    return this.prisma.product.findMany({
      skip: pagination.skip,
      take: pagination.take,
      where: {
        AND: [
          {
            name: { contains: pagination.search, mode: 'insensitive' },
          },
          {
            categoryId: pagination.categoryId,
          },
        ],
      },
      include: {
        Category: {
          where: { delete_at: null }
        },
      }
    });
  }

  async updateProduct(
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return await this.prisma.product.update({
      where: { id: updateProductInput.id },
      data: {
        //Громосткая запись, можешь воспользоваться оператором '...' - ...updateProductInput. Почитай про него, ну и также можешь почитать про тернарных операторов
        name: updateProductInput.name,
        description: updateProductInput.description,
        price: updateProductInput.price,
        categoryId: updateProductInput.categoryId,
        caliber: updateProductInput.caliber,
        length: updateProductInput.length,
        shop: updateProductInput.shop,
        update_at: new Date(),
      },
    });
  }

  async deleteProduct(deleteProductArgs: DeleteProductArgs) {
    return await this.prisma.product.delete({
      where: {
        id: deleteProductArgs.id,
      },
    });
  }
}
