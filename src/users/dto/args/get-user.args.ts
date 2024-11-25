import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { User } from 'src/users/model/users.model';

@ArgsType()
export class GetUserArgs extends User {
  @Field((type) => Int)
  @Type(() => Number)
  id: number;
}
