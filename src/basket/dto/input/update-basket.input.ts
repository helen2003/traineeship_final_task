import { Field, InputType, Int } from '@nestjs/graphql';
import { Baskets } from 'src/basket/model/basket.model';

@InputType()
//Аналогично что и в CreateUserInput
export class UpdateBasketInput extends Baskets {
  @Field((type) => Int, { description: 'Идентифкатор позиции корзины' })
  id: number;

  @Field((type) => Int, { description: 'Количесвто товара' })
  count: number;
}
