import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { UpdateUserInput } from './dto/input/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(userDto: CreateUserDto): Promise<User> {

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    /*
    Мы рассматриваем кейс что корзина сущность Basket у пользователя одна, тогда мы можем при создании пользователя сразу создавать basket
      await this.prisma.user.create({
      data: { ...userDto, password: hashPassword, 
        Basket { 
          create {
            ...
          }
        } 
      },
    });
    */
    

    const user = await this.prisma.user.create({
      data: { ...userDto, password: hashPassword},
      //omit: {}
    });

    //Лишняя нагроможденноть можешь сразу в return это делать return this.prisma.user.create({...})
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id: updateUserInput.id },
      data: {
        email: updateUserInput.email,
        login: updateUserInput.login,
        firstName: updateUserInput.firstName,
        name: updateUserInput.name,
        role: updateUserInput.role,
      },
    });
  }
}
