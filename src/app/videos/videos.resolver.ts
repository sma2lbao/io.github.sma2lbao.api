import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { GqlJwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { PaginatedQuery } from '@/global/dto/paginated.dto';
import { CreateVideoInput, VideoPaginated } from './dto/videos.dto';
import { CreateVideoMediumInput } from '../mediums/dto/mediums.dto';

@Resolver('Videos')
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}

  @Mutation(() => Video)
  @UseGuards(GqlJwtAuthGuard)
  async create_video(
    @Args('video') createVideo: CreateVideoInput,
    @CurrUser() user: User,
  ): Promise<Video> {
    return await this.videosService.create(createVideo, user);
  }

  @Mutation(() => Video)
  async add_mediums_to_video(
    @Args('video_id', { type: () => ID }) video_id: number,
    @Args('video_medium') video_medium: CreateVideoMediumInput,
  ): Promise<Video> {
    return await this.videosService.addMediumsToVideo(video_id, video_medium);
  }

  @Query(() => Video)
  async video(@Args('id', { type: () => ID }) id: number): Promise<Video> {
    return await this.videosService.findOne({ id: id });
  }

  @Query(() => VideoPaginated)
  async videos_paginated(
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<VideoPaginated> {
    const result = await this.videosService.findCursorPagition({
      query: query,
      key: 'create_at',
    });
    return result;
  }
}
