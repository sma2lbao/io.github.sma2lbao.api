import {
  Resolver,
  Mutation,
  Args,
  Query,
  Subscription,
  ID,
} from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { CreateReviewInput, ReviewPaginated } from './dto/reviews.dto';
import { PaginatedQuery } from '@/global/dto/paginated.dto';
import { ReviewMedium } from './interfaces/reviews.interface';
import { MovieReviewsService } from './movie_reviews.service';
import { REVIEW_CREATED } from './reivews.constants';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '@/core/graphql/constants/graphql.constant';

@Resolver('Reviews')
export class ReviewsResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
    private readonly reviewsService: ReviewsService,
    private readonly movieReviewsService: MovieReviewsService,
  ) {}

  @Mutation(() => Review)
  @UseGuards(GqlJwtAuthGuard)
  async create_review(
    @Args('review') review: CreateReviewInput,
    @CurrUser() user: User,
  ): Promise<Review> {
    const { type, medium_id } = review;
    const result = await this.reviewsService.create(review, user);
    this.pubsub.publish(REVIEW_CREATED, {
      review_created: result,
      type,
      medium_id,
    });
    return result;
  }

  @Query(() => ReviewPaginated)
  async reviews_paginated(
    @Args('type', { type: () => ReviewMedium, nullable: true })
    type: ReviewMedium,
    @Args('medium_id', { type: () => ID, nullable: true }) medium_id: number,
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<ReviewPaginated> {
    if (type === ReviewMedium.MOVIE) {
      return await this.movieReviewsService.findCursorPagition({
        query: query,
        key: 'create_at',
        where: {
          movie: {
            id: medium_id,
          },
        },
      });
    }
    return await this.reviewsService.findCursorPagition({
      query: query,
      key: 'create_at',
    });
  }

  @Subscription(() => Review, {
    filter: (payload, variables) => {
      return (
        payload.type === variables.type &&
        payload.medium_id === variables.medium_id
      );
    },
  })
  review_created(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('type', { type: () => ReviewMedium }) type: ReviewMedium,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('medium_id', { type: () => ID }) medium_id: number,
  ): any {
    return this.pubsub.asyncIterator(REVIEW_CREATED);
  }
}
