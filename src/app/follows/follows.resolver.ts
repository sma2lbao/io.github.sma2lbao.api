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
import * as moment from 'moment';

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
    @Args('first', { type: () => Int, nullable: true }) first?: number,
    @Args('after', { nullable: true }) after?: string,
  ): Promise<FollowPaginated> {
    const [follows, total]: [
      Follow[],
      number,
    ] = await this.followsService.findPagition({
      limit: first,
      cursorField: 'create_at',
      before: after
        ? moment(Buffer.from(after, 'base64').toString('ascii'), 'x').toDate()
        : undefined,
      order: {
        create_at: -1,
      },
      where: {
        owner: user,
      },
    });
    const result: FollowPaginated = {
      edges: follows.map(follow => {
        return {
          node: follow,
          cursor: Buffer.from(moment(follow.create_at).format('x')).toString(
            'base64',
          ),
        };
      }),
      hasNextPage: total > follows.length,
    };
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
