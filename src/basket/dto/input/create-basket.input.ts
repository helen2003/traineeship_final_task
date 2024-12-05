import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { BasketProductModel } from 'src/basket/model/basketProduct.model';

@InputType()
export class CreateBasketInput extends PickType(BasketProductModel, [
  'product_id',
  'count',
]) {
  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  count: number;
}
