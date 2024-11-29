import { Field, Int, ObjectType } from '@nestjs/graphql';
//import { Basket } from '@prisma/client'
@ObjectType()
//Зедсь ты описываешь graphql моделей сущности из prisma, тут стоит имплементировать из prisma Тип
//export class BasketsModel implements Basket {
//И когда описываешь модель, не стоит расписывать описание
export class Baskets {
  @Field((type) => Int, { description: 'Идентификатор позиции корзины' })
  id: number;

  @Field((type) => Int, { description: 'Идентификатор пользователя' })
  userId: number;

  @Field((type) => Int, { description: 'Идентификатор товара' })
  productId: number;

  @Field((type) => Int, { description: 'Количество товара' })
  count: number;

  @Field({ description: 'Время создания позиции корзины' })
  created_at: Date;

  @Field({ description: 'Время обновления позиции корзины' })
  update_at: Date;

  @Field({ description: 'Время удаления позиции корзины' })
  delete_at: Date;
}
