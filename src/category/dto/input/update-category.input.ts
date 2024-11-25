import { Field, InputType, Int } from '@nestjs/graphql';
import { Categoties } from 'src/category/model/category.model';

@InputType()
export class UpdateCategoryInput extends Categoties {
  @Field((type) => Int, { description: 'Идентификатор категории' })
  id: number;

  @Field({ description: 'Наименование категории' })
  name: string;
}
