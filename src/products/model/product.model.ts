import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '@prisma/client';

@ObjectType()
export class Products implements Product {
  @Field((type) => Int, { description: 'Иденификатор товара' })
  id: number;

  @Field({ description: 'Изображение товара' })
  image: string;

  @Field({ description: 'Наименование товара' })
  name: string;

  @Field({ description: 'Описание товара' })
  description: string;

  @Field((type) => Float, { description: 'Цена товара' })
  price: number;

  @Field({ description: 'Калибр товара' })
  caliber: string;

  @Field({ description: 'Длина ствола товара' })
  length: string;

  @Field({ description: 'Магазин товара' })
  shop: string;

  @Field((type) => Int, { description: 'Категория товара' })
  categoryId: number;

  @Field((type) => Int, { description: 'Продавец товара' })
  authorId: number;

  @Field({ description: 'Дата создания товара' })
  created_at: Date;

  @Field({ description: 'Дата обновления товара' })
  update_at: Date;

  @Field({ description: 'Дата удаления товара' })
  delete_at: Date;
}
