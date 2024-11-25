import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Categoties } from 'src/category/model/category.model';

@ArgsType()
export class DeleteСategoryArgs extends Categoties {
  @Field((type) => Int, { description: 'Иденификатор категории' })
  id: number;
}
