import { Injectable } from '@nestjs/common';
import { Basket } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBasketInput } from './dto/input/create-basket.input';
import { GetBasketArgs } from './dto/args/get-basket.args';
import { UpdateBasketInput } from './dto/input/update-basket.input';
import { DeleteBasketArgs } from './dto/args/delete-basket.args';

/*
Не нужно просто так вызывать return await, ты просто так создаешь еще один Promise, почитай https://purpleschool.ru/blog/return-await
*/
@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) {}

  async createBasket(createBasketData: CreateBasketInput): Promise<Basket> {
    return await this.prisma.basket.create({ data: createBasketData });
  }

  async findBasket(getBasketArgs: GetBasketArgs): Promise<Basket[]> {
    return await this.prisma.basket.findMany({
      where: {
        userId: getBasketArgs.userId,
      },
    });
  }

  async updateBasket(updateBasketData: UpdateBasketInput): Promise<Basket> {
    return await this.prisma.basket.update({
      where: { id: updateBasketData.id },
      data: {
        count: updateBasketData.count,
        update_at: new Date(), // чтобы не делать каждый раз так, ты в schema.prisma (28 строка) можешь указать декоратор для этого 
      },
    });
  }

  async deleteBasket(deletebasketArgs: DeleteBasketArgs) {
    return await this.prisma.basket.delete({
      where: {
        id: deletebasketArgs.id,
      },
    });
  }
}
