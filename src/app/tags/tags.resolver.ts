import { Resolver, Mutation, Args } from '@nestjs/graphql';
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

  @Mutation(() => Boolean)
  async add_shadow_to_tag(
    @Args('shadow_id') shadow_id: number,
    @Args('tag_id') tag_id: number,
  ): Promise<boolean> {
    return await this.tagsService.addShadowToTag(shadow_id, tag_id);
  }

  @Mutation(() => Boolean)
  async add_category_to_tag(
    @Args('category_id') category_id: number,
    @Args('tag_id') tag_id: number,
  ): Promise<boolean> {
    return await this.tagsService.addCategoryToTag(category_id, tag_id);
  }
}
