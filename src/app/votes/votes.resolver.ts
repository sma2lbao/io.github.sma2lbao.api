import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { VotesService } from './votes.service';
import { Vote } from './entities/vote.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { CreateVoteInput } from './dto/votes.dto';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';

@Resolver('Votes')
export class VotesResolver {
  constructor(private readonly votesService: VotesService) {}

  @Mutation(() => Vote)
  @UseGuards(GqlJwtAuthGuard)
  async create_or_update_vote(
    @Args('vote') createVote: CreateVoteInput,
    @CurrUser() user: User,
  ): Promise<Vote> {
    return await this.votesService.createOrUpdate(createVote, user);
  }

  @Query(() => Vote)
  @UseGuards(GqlJwtAuthGuard)
  async vote(
    @Args('medium_id') medium_id: number,
    @CurrUser() user: User,
  ): Promise<Vote> {
    return await this.votesService.findOne({
      where: {
        medium: {
          id: medium_id,
        },
        owner: user,
      },
    });
  }
}
