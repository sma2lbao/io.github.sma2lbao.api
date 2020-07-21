import { Injectable } from '@nestjs/common';
import { Repository, TreeRepository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryInput } from './dto/category.dto';
import { BaseService } from '@/global/services/base.service';
import { EntityNotFoundException } from '@/global/exceptions/base.exception';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryReposity: Repository<Category>,
    @InjectRepository(Category)
    private readonly categoryTreeReposity: TreeRepository<Category>,
  ) {
    super(categoryReposity);
  }

  async create(createCategory: CreateCategoryInput): Promise<Category> {
    const { parent_id, children, ...rest } = createCategory;
    const category = this.categoryReposity.create(rest);
    if (parent_id) {
      const parent = await this.findById(parent_id);
      if (!parent) {
        throw new EntityNotFoundException();
      }
      category.parent = parent;
    }
    if (children) {
      const createChildren = children.map(child =>
        this.categoryReposity.create(child),
      );
      category.children = createChildren;
    }
    return await this.categoryTreeReposity.save(category);
  }

  async deleteById(id: number): Promise<any> {
    console.log(id);
    const category = await this.findById(id);
    console.log('category', category);
    const res = await this.categoryTreeReposity.remove(category);
    console.log(res);
    return res;
  }

  async findById(id: number): Promise<Category> {
    return await this.categoryReposity.findOne({
      id: id,
    });
  }
}
