import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Basket } from '@prisma/client';
import { BasketProductModel } from 'src/basket/model/basketProduct.model';
import { ValidateUser } from 'src/common/decorators/dto/validate-user.dto';
import { UserModel } from 'src/users/model/users.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: UserModel) {
    return this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome',
      context: {
        name: user.role,
      },
    });
  }

  async sendAboutBuy(
    user: ValidateUser,
    baskets: BasketProductModel[],
    sumBuy: number,
  ) {
    return this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Информация о покупке',
      template: './buy-product',
      context: {
        products: baskets,
        sum: sumBuy,
      },
    });
  }
}
