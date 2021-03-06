import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('Categories')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  async create_category(
    @Args('category') createCategory: CreateCategoryInput,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategory);
  }

  @Query(() => Category)
  async category(@Args('id') id: number): Promise<Category> {
    return await this.categoriesService.findById(id);
  }

  @Mutation(() => Boolean)
  async delete_category(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    const result = await this.categoriesService.deleteById(id);
    return true;
  }
}
