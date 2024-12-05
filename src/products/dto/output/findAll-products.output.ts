import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductModel } from 'src/products/model/product.model';

@ObjectType()
export class ProductAllOutput {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [ProductModel])
  Products: ProductModel[];
}
