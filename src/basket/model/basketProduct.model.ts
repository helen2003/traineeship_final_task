import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BasketProduct } from '@prisma/client';

@ObjectType()
export class BasketProductModel implements BasketProduct {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  basket_id: number;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  product_id: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  deleted_at: Date;
}
