import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { GetProductArgs } from './dto/args/product-find-all.args';
import { UpdateProductInput } from './dto/input/update-product.input';
import { CreateProductInput } from './dto/input/create-product.input';
import { AddFilesInput } from './dto/input/add-files.input';
import { ProductModel } from './model/product.model';
import { CategoryModel } from 'src/category/model/category.model';
import { FileModel } from 'src/files/model/files.model';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => ProductModel)
  getOneProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Query(() => [ProductModel])
  getProducts(@Args() getProducts: GetProductArgs): Promise<Product[]> {
    return this.productsService.findAll(getProducts);
  }

  @ResolveField('Category', () => [CategoryModel])
  async getCategory(@Parent() product: ProductModel) {
    const { categoryId } = product;
    return this.productsService.findCategory(categoryId);
  }

  @ResolveField('File', () => [FileModel])
  async getFiles(@Parent() product: ProductModel) {
    const { id } = product;
    return this.productsService.findFiles(id);
  }

  @Roles('SELLER', 'ADMIN')
  @Mutation(() => ProductModel)
  createProduct(
    @Args('createProductData') createProductInput: CreateProductInput,
    @Args('addFilesData') addFilesData: AddFilesInput,
  ): Promise<Product> {
    return this.productsService.create(createProductInput, addFilesData);
  }

  @Roles('SELLER', 'ADMIN')
  @Mutation(() => ProductModel)
  updateProduct(
    @Args('updateProductData') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update(updateProductInput);
  }

  @Roles('SELLER', 'ADMIN')
  @Mutation(() => ProductModel)
  deleteProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.delete(id);
  }
}
