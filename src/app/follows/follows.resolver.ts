import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { FollowsService } from './follows.service';
import { UseGuards } from '@nestjs/common';
import { Follow } from './entities/follow.entity';
import { GqlJwtAuthGuard } from '@/core/auth/guards/gql-auth.guard';
import { User } from '@/core/users/entities/user.entity';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { CreateFollowInput, DeleteFollowInput } from './dto/follows.dto';

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
    return await this.followsService.findByConditions({
      owner: user,
    });
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
