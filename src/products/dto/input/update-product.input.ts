import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Products } from 'src/products/model/product.model';

@InputType()
export class UpdateProductInput extends Products {
  @Field({ description: 'Наименование товара' })
  name: string;

  @Field({ description: 'Описание товара' })
  description: string;

  @Field((type) => Float, { description: 'Цена товара' })
  price: number;

  @Field((type) => Int, { description: 'Категория товара' })
  categoryId: number;

  @Field({ description: 'Калибр товара' })
  caliber: string;

  @Field({ description: 'Длина ствола товара' })
  length: string;

  @Field({ description: 'Магазин товара' })
  shop: string;
}
