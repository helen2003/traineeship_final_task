import { Injectable } from '@nestjs/common';
import { Basket, BasketProduct } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBasketInput } from './dto/input/create-basket.input';
import { UpdateBasketInput } from './dto/input/update-basket.input';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { ValidateUser } from 'src/common/decorators/dto/validate-user.dto';
import { BasketProductModel } from './model/basketProduct.model';

@Injectable()
export class BasketService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private userService: UsersService,
  ) {}

  async create(
    user: ValidateUser,
    createBasketData: CreateBasketInput,
  ): Promise<BasketProduct> {
    const basketUser = await this.prisma.basket.findFirst({
      where: {
        userId: user.sub,
      },
    });
    return this.prisma.basketProduct.create({
      data: {
        ...createBasketData,
        basket_id: basketUser.id,
      },
    });
  }

  async update(id: number, count: number): Promise<BasketProduct> {
    return this.prisma.basketProduct.update({
      where: {
        id: id,
      },
      data: {
        count: count,
      },
    });
  }

  async findBasket(user: ValidateUser): Promise<BasketProductModel[]> {
    const basket = await this.prisma.basket.findFirst({
      where: {
        userId: user.sub,
      },
      include: {
        BasketProduct: true,
      },
    });
    return basket.BasketProduct;
  }

  async buyProduct(user: ValidateUser) {
    const basket = await this.prisma.basket.findFirst({
      where: {
        userId: user.sub,
      },
      include: {
        BasketProduct: {
          include: {
            Product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    console.log(basket.BasketProduct);

    const sumBuy = basket.BasketProduct.reduce(
      (acc, cur) => acc + cur.count * cur.Product.price,
      0,
    );

    this.mailService.sendAboutBuy(user, basket.BasketProduct, sumBuy);
    return basket.BasketProduct;
  }

  async delete(id: number): Promise<BasketProductModel> {
    return this.prisma.basketProduct.delete({
      where: {
        id: id,
      },
    });
  }
}
