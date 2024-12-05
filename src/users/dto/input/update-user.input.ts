import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { UserModel } from 'src/users/model/users.model';
// import { User } from 'src/users/model/users.model';

@InputType()
export class UpdateUserInput extends PickType(UserModel, [
  'email',
  'login',
  'firstName',
  'name',
]) {
  @Field({ nullable: true })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @Field({ nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  login: string;

  @Field({ nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string;

  @Field({ nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  name: string;
}
