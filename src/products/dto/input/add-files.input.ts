import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddFilesInput {
  @Field((type) => [Int], { nullable: true })
  image: number[];
}
