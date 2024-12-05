import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetProductArgs {
  @Field(() => Int, { nullable: true })
  skip: number;

  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => Int, { nullable: true })
  categoryId: number;

  @Field(() => String, { nullable: true })
  search: string;
}
