import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Baskets } from 'src/basket/model/basket.model';

@ArgsType()
export class GetBasketArgs extends Baskets {
  @Field((type) => Int, { description: 'Идентификатор пользователя' })
  userId: number;
}
