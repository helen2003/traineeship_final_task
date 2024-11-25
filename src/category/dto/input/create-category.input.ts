import { Field, InputType } from '@nestjs/graphql';
import { Categoties } from 'src/category/model/category.model';

@InputType()
export class CreateCategoryInput extends Categoties {
  @Field({ description: 'Наименование категории' })
  name: string;
}
