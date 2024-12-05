import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { CategoryModel } from '../model/category.model';

@InputType()
export class CategorytInput extends PickType(CategoryModel, ['name']) {
    @Field()
    name: string
}
