import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Products } from './model/product.model';
import { Product } from '@prisma/client';
import { GetProductArgs } from './dto/args/get-product.args';
import { PaginationProductArgs } from './dto/args/product-pagination.args';
import { UpdateProductInput } from './dto/input/update-product.input';
import { CreateProductInput } from './dto/input/create-product.input';
import { DeleteProductArgs } from './dto/args/delete-product.args';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver(() => Products)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => Products)
  getOneProduct(@Args() getOneProduct: GetProductArgs): Promise<Product> {
    return this.productsService.findOneProduct(getOneProduct);
  }

  @Query(() => [Products])
  getProducts(
    @Args() getProducts: PaginationProductArgs,
  ): Promise<Product[] | null> {
    return this.productsService.paginationProducts(getProducts);
  }

  @Roles('SELLER')
  @Mutation(() => Products)
  createProduct(
    @Args('createProductData') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }

  @Roles('SELLER', 'ADMIN')
  @Mutation(() => Products)
  updateProduct(
    @Args('updateProductData') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.updateProduct(updateProductInput);
  }

  @Roles('SELLER', 'ADMIN')
  @Mutation(() => Products)
  deleteProduct(
    @Args() deleteProductArgs: DeleteProductArgs,
  ){
    return this.productsService.deleteProduct(deleteProductArgs);
  }
}
