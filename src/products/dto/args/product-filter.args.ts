import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Products } from 'src/products/model/product.model';

@ArgsType()
export class FilterProductArgs extends Products {
  @Field((type) => Int, { description: 'Фильтр товаров' })
  categoryId: number;
}
