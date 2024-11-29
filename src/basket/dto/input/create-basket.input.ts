import { Field, InputType, Int } from '@nestjs/graphql';
import { Baskets } from 'src/basket/model/basket.model';

@InputType()
//Почитай еще раз про наследование, зачем ты в Input наследуешься от модели сущности,
export class CreateBasketInput extends Baskets {
  //В graphql здесь не нужно указывать @Field((type) => Int), можно указать просто @Field(() => Int)
  @Field(() => Int, { description: 'Идентифкатор пользователя' })
  userId: number;

  @Field((type) => Int, { description: 'Идентифкатор товара' })
  productId: number;

  @Field((type) => Int, { description: 'Количесвто товара' })
  count: number;
}
