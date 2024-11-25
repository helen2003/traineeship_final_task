import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoleEnum } from '@prisma/client';

@ObjectType()
export class User {
  @Field((type) => Int, { description: 'Идентификатор пользователя' })
  id: number;

  @Field({ description: 'Почта пользователя' })
  email: string;

  @Field({ description: 'Логин пользователя' })
  login: string;

  @Field({ description: 'Пароль пользователя' })
  password: string;

  @Field({ description: 'Фамилия пользователя' })
  firstName: string;

  @Field({ description: 'Имя пользователя' })
  name: string;

  @Field({ description: 'Роль пользователя' })
  role: RoleEnum;
}
