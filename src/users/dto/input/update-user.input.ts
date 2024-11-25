import { Field, InputType, Int } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/users/model/users.model';

@InputType()
export class UpdateUserInput extends User {
  @Field((type) => Int, { description: 'Идентификатор пользователя' })
  id: number;

  @Field({ description: 'Почта пользователя', nullable: true })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @Field({ description: 'Логин пользователя', nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  login: string;

  //   @Field({ description: 'Пароль пользователя' })
  //   password: string;

  @Field({ description: 'Фамилия пользователя', nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string;

  @Field({ description: 'Имя пользователя', nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  name: string;

  @Field({ description: 'Роль пользователя', nullable: true })
  role: $Enums.RoleEnum;
}
