import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/gql-auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { CreateReviewInput } from './dto/reviews.dto';

@Resolver('Reviews')
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  @UseGuards(GqlJwtAuthGuard)
  async create_review(
    @Args('review') review: CreateReviewInput,
    @CurrUser() user: User,
  ): Promise<Review> {
    return await this.reviewsService.create(review, user);
  }
}
