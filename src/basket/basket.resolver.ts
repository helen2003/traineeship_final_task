import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BasketService } from './basket.service';
import { Basket, BasketProduct } from '@prisma/client';
import { CreateBasketInput } from './dto/input/create-basket.input';
import { UpdateBasketInput } from './dto/input/update-basket.input';
import { BasketProductModel } from './model/basketProduct.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ValidateUser } from 'src/common/decorators/dto/validate-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { count } from 'console';
import { BasketModel } from './model/basket.model';

@Resolver(() => BasketProductModel)
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Query(() => [BasketModel])
  @UseGuards(JwtAuthGuard)
  getBasket(@CurrentUser() user: ValidateUser): Promise<BasketProductModel[]> {
    return this.basketService.findBasket(user);
  }

  @Query(() => [BasketProductModel])
  @UseGuards(JwtAuthGuard)
  buyProduct(@CurrentUser() user: ValidateUser) {
    return this.basketService.buyProduct(user);
  }

  @Mutation(() => BasketProductModel)
  @UseGuards(JwtAuthGuard)
  createBasketProduct(
    @CurrentUser() user: ValidateUser,
    @Args('createBasket') createBasketData: CreateBasketInput,
  ): Promise<BasketProduct> {
    return this.basketService.create(user, createBasketData);
  }

  @Mutation(() => BasketProductModel)
  @UseGuards(JwtAuthGuard)
  updateBasket(
    @Args('idBasketProduct', { type: () => Int }) id: number,
    @Args('count', { type: () => Int }) count: number,
  ): Promise<BasketProduct> {
    return this.basketService.update(id, count);
  }

  @Mutation(() => BasketProductModel)
  @UseGuards(JwtAuthGuard)
  deleteBasket(
    @Args('idBasketProduct', { type: () => Int }) id: number,
  ): Promise<BasketProductModel> {
    return this.basketService.delete(id);
  }
}
