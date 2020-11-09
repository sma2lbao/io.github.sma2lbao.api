import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { Shadow } from './entities/shadow.entity';
import {
  CreateShadowInput,
  ShadowPaginated,
  UpdateShadowInput,
} from './dto/shadows.dto';
import { ShadowsService } from './shadows.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { PaginatedQuery } from '@/global/dto/paginated.dto';
import { CreateShadowMediumInput } from '../mediums/dto/mediums.dto';

@Resolver('Shadows')
export class ShadowsResolver {
  constructor(private readonly shadowsService: ShadowsService) {}

  @Mutation(() => Shadow)
  @UseGuards(GqlJwtAuthGuard)
  async create_shadow(
    @Args('shadow') createShadow: CreateShadowInput,
    @CurrUser() user: User,
  ): Promise<Shadow> {
    return await this.shadowsService.create(createShadow, user);
  }

  @Mutation(() => Shadow)
  @UseGuards(GqlJwtAuthGuard)
  async update_shadow(
    @Args('shadow_id', { type: () => ID }) shadow_id: number,
    @Args('shadow') updateShadow: UpdateShadowInput,
    @CurrUser() user: User,
  ): Promise<Shadow> {
    return await this.shadowsService.updateById(shadow_id, updateShadow, user);
  }

  @Mutation(() => Shadow)
  async add_mediums_to_shadow(
    @Args('shadow_id', { type: () => ID }) shadow_id: number,
    @Args('shadow_medium') shadow_medium: CreateShadowMediumInput,
  ): Promise<Shadow> {
    return await this.shadowsService.addMediumsToShadow(
      shadow_id,
      shadow_medium,
    );
  }

  @Mutation(() => Shadow)
  async add_tags_to_shadow(
    @Args('shadow_id', { type: () => ID }) shadow_id: number,
    @Args('tag_ids', { type: () => [ID] }) tag_ids: number[],
  ): Promise<Shadow> {
    return await this.shadowsService.addTagsToShadow(shadow_id, tag_ids);
  }

  @Query(() => Shadow)
  async shadow(@Args('id', { type: () => ID }) id: number): Promise<Shadow> {
    return await this.shadowsService.findOne({ id: id });
  }

  @Query(() => ShadowPaginated)
  async shadows_paginated(
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<ShadowPaginated> {
    const result = await this.shadowsService.findCursorPagition({
      query: query,
      key: 'create_at',
    });
    return result;
  }

  @Query(() => ShadowPaginated)
  async user_shadows_paginated(
    @Args('author_username') author_username: string,
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<ShadowPaginated> {
    const result = await this.shadowsService.findCursorPagition({
      query: query,
      key: 'create_at',
      where: {
        author: {
          username: author_username,
        },
      },
    });
    return result;
  }
}
