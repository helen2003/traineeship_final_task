import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryModel } from './model/category.model';
import { Category } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CategorytInput } from './dto/category.input';
import { CategoryAllOutput } from './dto/findAll-categories.output';

// @Resolver(() => CategoryAllModel)
@Resolver(() => CategoryModel)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => CategoryAllOutput)
  getCategoryAll() {
    return this.categoryService.getAll()
  }

  // @Roles('ADMIN')
  @Mutation(() => CategoryModel)
  createCategory(
    // @Args({ name: 'name', type: () => String }) name: string,
    // @Args('name') name: string,
    @Args('createCategoryData') createCategoryInput: CategorytInput,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput.name);
  }

  @Roles('ADMIN')
  @Mutation(() => CategoryModel)
  updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryData') updateCategoryInput: CategorytInput,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryInput.name);
  }

  @Roles('ADMIN')
  @Mutation(() => CategoryModel)
  deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.delete(id);
  }
}
