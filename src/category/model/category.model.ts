import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from '@prisma/client';

@ObjectType()
export class CategoryModel implements Category {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date)
  deleted_at: Date;
}
