import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '@prisma/client';
import { CategoryModel } from 'src/category/model/category.model';
import { FileModel } from 'src/files/model/files.model';

@ObjectType()
export class ProductModel implements Product {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => [FileModel], { nullable: true })
  File: FileModel[];

  @Field(() => [CategoryModel], { nullable: true })
  Category: CategoryModel[];

  @Field(() => Float)
  price: number;

  @Field(() => String)
  caliber: string;

  @Field(() => String)
  length: string;

  @Field(() => String)
  shop: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  authorId: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  deleted_at: Date;
}
