import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BasketService } from './basket.service';
import { GetBasketArgs } from './dto/args/get-basket.args';
import { Basket } from '@prisma/client';
import { Baskets } from './model/basket.model';
import { CreateBasketInput } from './dto/input/create-basket.input';
import { UpdateBasketInput } from './dto/input/update-basket.input';
import { DeleteBasketArgs } from './dto/args/delete-basket.args';

@Resolver(() => Baskets)
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Query(() => [Baskets], { description: 'Получение корзины пользователя' })
  getBasket(@Args() getBasketArgs: GetBasketArgs): Promise<Basket[]> {
    return this.basketService.findBasket(getBasketArgs);
  }

  @Mutation(() => Baskets, { description: 'Создание позиции корзины' })
  createBasket(@Args('createBasket') createBasketData: CreateBasketInput): Promise<Basket> {
    return this.basketService.createBasket(createBasketData);
  }

  @Mutation(() => Baskets, { description: 'Обнровление позиции корзины' })
  updateBasket(@Args('updateBasket') updateBasketData: UpdateBasketInput): Promise<Basket> {
    return this.basketService.updateBasket(updateBasketData);
  }

  @Mutation(() => Baskets, { description: 'Удаление позиции корзины' })
  deleteBasket(@Args() deleteBasketArgs: DeleteBasketArgs): Promise<Basket> {
    return this.basketService.updateBasket(deleteBasketArgs);
  }
}
