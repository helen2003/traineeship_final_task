import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from '@prisma/client';

@ObjectType()
export class CategoryModel implements Category {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  deleted_at: Date;
}
