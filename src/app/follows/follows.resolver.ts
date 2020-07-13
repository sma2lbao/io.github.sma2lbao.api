import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { FollowsService } from './follows.service';
import { UseGuards } from '@nestjs/common';
import { Follow } from './entities/follow.entity';
import { GqlJwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { User } from '@/core/users/entities/user.entity';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import {
  CreateFollowInput,
  DeleteFollowInput,
  FollowPaginated,
} from './dto/follows.dto';
import { PaginatedQuery } from '@/global/dto/paginated.dto';
import { UsersService } from '@/core/users/users.service';

@Resolver('Follows')
export class FollowsResolver {
  constructor(
    private readonly followsService: FollowsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Follow])
  @UseGuards(GqlJwtAuthGuard)
  async follows(@CurrUser() user: User): Promise<Follow[]> {
    return await this.followsService.find({
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

  @Query(() => Int)
  @UseGuards(GqlJwtAuthGuard)
  async follows_total(
    @CurrUser() user: User,
    @Args('follower_uid', { nullable: true }) follower_uid?: string,
  ): Promise<number> {
    const follower = follower_uid
      ? await this.usersService.findByUid(follower_uid)
      : user;
    return await this.followsService.count({
      follower: follower,
    });
  }

  @Query(() => [Follow])
  @UseGuards(GqlJwtAuthGuard)
  async fans(@CurrUser() user: User): Promise<Follow[]> {
    const result = await this.followsService.find({
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

  @Query(() => Int)
  @UseGuards(GqlJwtAuthGuard)
  async fans_total(
    @CurrUser() user: User,
    @Args('owner_uid', { nullable: true }) owner_uid?: string,
  ): Promise<number> {
    const owner = owner_uid
      ? await this.usersService.findByUid(owner_uid)
      : user;
    return await this.followsService.count({
      owner: owner,
    });
  }

  @Query(() => Boolean)
  @UseGuards(GqlJwtAuthGuard)
  async is_following(
    @CurrUser() user: User,
    @Args('owner_uid') owner_uid: string,
    @Args('follower_uid', { nullable: true }) follower_uid?: string,
  ): Promise<boolean> {
    const owner = await this.usersService.findByUid(owner_uid);
    const follower = follower_uid
      ? await this.usersService.findByUid(follower_uid)
      : user;
    if (!owner || !follower) {
      throw new Error();
    }
    const follow = await this.followsService.findOne({
      owner: owner,
      follower: follower,
    });
    return follow ? true : false;
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
    @CurrUser() owner: User,
  ): Promise<Follow> {
    return await this.followsService.remove(follow, owner);
  }
}
