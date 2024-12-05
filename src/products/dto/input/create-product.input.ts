import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { ProductModel } from 'src/products/model/product.model';

@InputType()
export class CreateProductInput extends PickType(ProductModel, [
  'name',
  'description',
  'price',
  'categoryId',
  'authorId',
  'caliber',
  'length',
  'shop',
]) {

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  caliber: string;

  @Field(() => String)
  length: string;

  @Field(() => String)
  shop: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  authorId: number;
}
