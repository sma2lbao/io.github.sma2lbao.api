import { Resolver, Query, Args } from '@nestjs/graphql';
import { ShadowPaginated } from '../shadows/dto/shadows.dto';
import { PaginatedQuery } from '@/global/dto/paginated.dto';
import { ShadowsService } from '../shadows/shadows.service';
import { ILike, Like } from 'typeorm';

@Resolver()
export class SearchesResolver {
  constructor(private readonly shadowsService: ShadowsService) {}

  @Query(() => ShadowPaginated)
  async search_shadows_paginated(
    @Args('word', { nullable: true }) word: string,
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<ShadowPaginated> {
    const result = await this.shadowsService.findCursorPagition({
      query: query,
      key: 'create_at',
      where: [
        { title: ILike(`%${word}%`) },
        { sub_title: ILike(`%${word}%`) },
        { description: ILike(`%${word}%`) },
      ],
    });
    return result;
  }
}
