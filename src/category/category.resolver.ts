import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Categoties } from './model/category.model';
import { Category } from '@prisma/client';
import { CreateCategoryInput } from './dto/input/create-category.input';
import { UpdateCategoryInput } from './dto/input/update-category.input';
import { DeleteСategoryArgs } from './dto/args/delete-category.args';

@Resolver(() => Categoties)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Categoties])
  getCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Mutation(() => Categoties)
  createCategory(
    @Args('createCategory') createCategoryImput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryImput);
  }

  @Mutation(() => Categoties)
  updateCategory(
    @Args('updateCategory') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.updateCategory(updateCategoryInput);
  }

  @Mutation(() => Categoties)
  deleteCategory(@Args() deleteCategoryArgs: DeleteСategoryArgs) {
    return this.categoryService.deleteCategory(deleteCategoryArgs);
  }
}
