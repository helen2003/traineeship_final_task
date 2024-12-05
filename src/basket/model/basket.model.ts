import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Basket } from '@prisma/client';

@ObjectType()
export class BasketModel implements Basket {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  deleted_at: Date;
}
