import { Field, InputType, Int } from '@nestjs/graphql';
import { Baskets } from 'src/basket/model/basket.model';

@InputType()
export class CreateBasketInput extends Baskets {
  @Field((type) => Int, { description: 'Идентифкатор пользователя' })
  userId: number;

  @Field((type) => Int, { description: 'Идентифкатор товара' })
  productId: number;

  @Field((type) => Int, { description: 'Количесвто товара' })
  count: number;
}
