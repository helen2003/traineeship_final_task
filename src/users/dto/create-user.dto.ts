import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { UserModel } from '../model/users.model';

export class CreateUserDto extends PickType(UserModel, [
  'email',
  'login',
  'password',
]) {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Логин' })
  @IsString({ message: 'Должно быть строкой' })
  login: string;

  @ApiProperty({ example: '1234', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  password: string;
}
