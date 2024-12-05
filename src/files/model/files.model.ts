import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { File } from '@prisma/client';

@ObjectType()
export class FileModel implements File {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  productId: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date)
  deleted_at: Date;
}
