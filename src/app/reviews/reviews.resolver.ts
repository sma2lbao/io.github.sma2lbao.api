import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { CreateReviewInput, ReviewPaginated } from './dto/reviews.dto';
import { PaginatedQuery } from '@/global/dto/paginated.dto';
import { ReviewMedium } from './interfaces/reviews.interface';
import { MovieReviewsService } from './movie_reviews.service';

@Resolver('Reviews')
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly movieReviewsService: MovieReviewsService,
  ) {}

  @Mutation(() => Review)
  @UseGuards(GqlJwtAuthGuard)
  async create_review(
    @Args('review') review: CreateReviewInput,
    @CurrUser() user: User,
  ): Promise<Review> {
    return await this.reviewsService.create(review, user);
  }

  @Query(() => ReviewPaginated)
  async reviews_paginated(
    @Args('type') type: ReviewMedium,
    @Args('medium_id') mediumId: number,
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<ReviewPaginated> {
    if (type === ReviewMedium.MOVIE) {
      return await this.movieReviewsService.findCursorPagition({
        query: query,
        key: 'create_at',
        where: {
          movie: {
            id: mediumId,
          },
        },
      });
    }
    return await this.reviewsService.findCursorPagition({
      query: query,
      key: 'create_at',
    });
  }
}
