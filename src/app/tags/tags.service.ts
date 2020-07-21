import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagInput } from './dto/tags.dto';
import { MoviesService } from '../movies/movies.service';
import { BaseService } from '@/global/services/base.service';
import { CategoriesService } from '../categories/categories.service';
import { EntityNotFoundException } from '@/global/exceptions/base.exception';

@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(
    @InjectRepository(Tag) private readonly tagsReposity: Repository<Tag>,
    private readonly moviesService: MoviesService,
    private readonly categoriesService: CategoriesService,
  ) {
    super(tagsReposity);
  }

  async created(createTag: CreateTagInput): Promise<Tag> {
    const tag = this.tagsReposity.create(createTag);
    return await this.tagsReposity.save(tag);
  }

  async addMovieToTag(movie_id: number, tag_id: number): Promise<boolean> {
    const movie = await this.moviesService.findOne({
      id: movie_id,
    });
    const tag = await this.tagsReposity.findOne({
      id: tag_id,
    });
    if (!movie || !tag) {
      throw new EntityNotFoundException();
    }
    await this.tagsReposity
      .createQueryBuilder()
      .relation('movies')
      .of(tag)
      .add(movie);
    return true;
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
