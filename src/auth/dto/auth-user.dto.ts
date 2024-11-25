import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthUserDto{
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly login: string;

  @ApiProperty({ example: '1234', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
