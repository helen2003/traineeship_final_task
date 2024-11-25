import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationProductArgs {
  @Field((type) => Int, { description: 'Пропуск товаров', nullable: true })
  skip: number;

  @Field((type) => Int, { description: 'Взять товаров', nullable: true })
  take: number;

  @Field((type) => Int, { description: 'Фильтр товаров', nullable: true })
  categoryId: number;

  @Field({ description: 'Поиск товаров', nullable: true })
  search: string;
}
