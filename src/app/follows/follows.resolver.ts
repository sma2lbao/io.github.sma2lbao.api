import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { FollowsService } from './follows.service';
import { UseGuards } from '@nestjs/common';
import { Follow } from './entities/follow.entity';
import { GqlJwtAuthGuard } from '@/core/auth/guards/gql-auth.guard';
import { User } from '@/core/users/entities/user.entity';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import {
  CreateFollowInput,
  DeleteFollowInput,
  FollowPaginated,
} from './dto/follows.dto';
import { PaginatedQuery } from '@/global/dto/paginated.dto';

@Resolver('Follows')
export class FollowsResolver {
  constructor(private readonly followsService: FollowsService) {}

  @Query(() => [Follow])
  @UseGuards(GqlJwtAuthGuard)
  async follows(@CurrUser() user: User): Promise<Follow[]> {
    return await this.followsService.findByConditions({
      follower: user,
    });
  }

  @Query(() => FollowPaginated)
  @UseGuards(GqlJwtAuthGuard)
  async follows_paginated(
    @CurrUser() user: User,
    @Args('query', { nullable: true }) query?: PaginatedQuery,
  ): Promise<FollowPaginated> {
    const result: FollowPaginated = await this.followsService.findCursorPagition(
      {
        query: query,
        key: 'create_at',
        where: {
          follower: user,
        },
      },
    );
    return result;
  }

  @Query(() => [Follow])
  @UseGuards(GqlJwtAuthGuard)
  async fans(@CurrUser() user: User): Promise<Follow[]> {
    const result = await this.followsService.findByConditions({
      owner: user,
    });
    return result;
  }

  @Query(() => FollowPaginated)
  @UseGuards(GqlJwtAuthGuard)
  async fans_paginated(
    @CurrUser() user: User,
    @Args('query', { nullable: true }) query?: PaginatedQuery,
  ): Promise<FollowPaginated> {
    const result: FollowPaginated = await this.followsService.findCursorPagition(
      {
        query: query,
        key: 'create_at',
        where: {
          owner: user,
        },
      },
    );
    return result;
  }

  @Mutation(() => Follow)
  @UseGuards(GqlJwtAuthGuard)
  async create_follow(
    @Args('follow') follow: CreateFollowInput,
    @CurrUser() user: User,
  ): Promise<Follow> {
    return await this.followsService.create(follow, user);
  }

  @Mutation(() => Follow)
  @UseGuards(GqlJwtAuthGuard)
  async remove_follow(
    @Args('follow') follow: DeleteFollowInput,
    @CurrUser() user: User,
  ): Promise<Follow> {
    return await this.followsService.remove(follow, user);
  }
}
