import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegistationDto extends PickType(CreateUserDto, [
  'login',
  'email',
  'password',
]) {}
