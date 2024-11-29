import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Baskets } from 'src/basket/model/basket.model';

@ArgsType()
//Мы для args не создаем отдельный класс, их можно указать в resolver пример в basket.resolver.ts
export class DeleteBasketArgs extends Baskets {
  @Field((type) => Int, { description: 'Идентификатор позиции корзины' })
  id: number;
}
