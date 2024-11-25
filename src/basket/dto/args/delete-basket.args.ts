import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Baskets } from 'src/basket/model/basket.model';

@ArgsType()
export class DeleteBasketArgs extends Baskets {
  @Field((type) => Int, { description: 'Идентификатор позиции корзины' })
  id: number;
}
