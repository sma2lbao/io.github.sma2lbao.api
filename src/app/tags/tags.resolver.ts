import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Query } from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';
import { CreateTagInput } from './dto/tags.dto';

@Resolver('Tags')
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation(() => Tag)
  async create_tag(@Args('tag') createTag: CreateTagInput): Promise<Tag> {
    return await this.tagsService.created(createTag);
  }
}
