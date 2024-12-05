import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoleEnum, User } from '@prisma/client';

@ObjectType()
export class UserModel implements User{
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  login: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  name: string;

  @Field()
  role: RoleEnum;

  @Field()
  created_at: Date;

  @Field()
  deleted_at: Date;

  @Field()
  updated_at: Date;
}
