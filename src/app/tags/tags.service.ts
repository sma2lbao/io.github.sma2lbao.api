import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagInput } from './dto/tags.dto';
import { BaseService } from '@/global/services/base.service';
import { CategoriesService } from '../categories/categories.service';
import { EntityNotFoundException } from '@/global/exceptions/base.exception';

@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(
    @InjectRepository(Tag) private readonly tagsReposity: Repository<Tag>,
    private readonly categoriesService: CategoriesService,
  ) {
    super(tagsReposity);
  }

  async created(createTag: CreateTagInput): Promise<Tag> {
    const tag = this.tagsReposity.create(createTag);
    return await this.tagsReposity.save(tag);
  }

  async addCategoryToTag(
    category_id: number,
    tag_id: number,
  ): Promise<boolean> {
    const category = await this.categoriesService.findOne({
      id: category_id,
    });
    const tag = await this.tagsReposity.findOne({
      id: tag_id,
    });
    if (!category || !tag) {
      throw new EntityNotFoundException();
    }
    await this.tagsReposity
      .createQueryBuilder()
      .relation('categories')
      .of(tag)
      .add(category);
    return true;
  }
}
