import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from '../model/category.model';

@ObjectType()
export class CategoryAllOutput {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [CategoryModel])
  Categories: CategoryModel[];
}
