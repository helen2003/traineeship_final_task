import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Products } from 'src/products/model/product.model';

@ArgsType()
export class DeleteProductArgs extends Products {
  @Field((type) => Int, { description: 'Иденификатор товара' })
  id: number;
}
