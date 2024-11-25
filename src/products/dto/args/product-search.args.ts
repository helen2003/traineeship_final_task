import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SearchProductArgs {
  @Field({ description: 'Поиск товаров' })
  search: string;
}
