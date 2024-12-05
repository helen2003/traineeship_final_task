import { Field, InputType, Int } from '@nestjs/graphql';
// import { Baskets } from 'src/basket/model/basketProduct.model';

@InputType()
//Аналогично что и в CreateUserInput
export class UpdateBasketInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  count: number;
}
