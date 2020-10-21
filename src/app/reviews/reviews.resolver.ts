import {
  Resolver,
  Mutation,
  Args,
  Query,
  Subscription,
  ID,
} from '@nestjs/graphql';
import { ReviewsService } from './services/reviews.service';
import { Review } from './entities/review.entity';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { CreateReviewInput, ReviewPaginated } from './dto/reviews.dto';
import { PaginatedQuery } from '@/global/dto/paginated.dto';
import { ReviewMedium } from './interfaces/reviews.interface';
import { ShadowReviewsService } from './services/shadow_reviews.service';
import { REVIEW_CREATED } from './reivews.constants';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '@/core/graphql/constants/graphql.constant';
import { MediumReviewsService } from './services/medium_reviews.service';

@Resolver('Reviews')
export class ReviewsResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
    private readonly reviewsService: ReviewsService,
    private readonly mediumReviewsService: MediumReviewsService,
    private readonly shadowReviewsService: ShadowReviewsService,
  ) {}

  @Mutation(() => Review)
  @UseGuards(GqlJwtAuthGuard)
  async create_review(
    @Args('review') review: CreateReviewInput,
    @CurrUser() user: User,
  ): Promise<Review> {
    const { type, type_id } = review;
    const result = await this.reviewsService.create(review, user);
    this.pubsub.publish(REVIEW_CREATED, {
      review_created: result,
      type,
      type_id,
    });
    return result;
  }

  @Query(() => ReviewPaginated)
  async reviews_paginated(
    @Args('type', { type: () => ReviewMedium, nullable: true })
    type: ReviewMedium,
    @Args('type_id', { type: () => ID, nullable: true }) type_id: number,
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<ReviewPaginated> {
    if (type === ReviewMedium.SHADOW) {
      return await this.shadowReviewsService.findCursorPagition({
        query: query,
        key: 'create_at',
        where: {
          shadow: {
            id: type_id,
          },
        },
      });
    }
    return await this.mediumReviewsService.findCursorPagition({
      query: query,
      key: 'create_at',
      where: {
        medium: {
          id: type_id,
        },
      },
    });
  }

  @Subscription(() => Review, {
    filter: (payload, variables) => {
      return (
        payload.type === variables.type && payload.type_id === variables.type_id
      );
    },
  })
  review_created(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('type', { type: () => ReviewMedium }) type: ReviewMedium,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('type_id', { type: () => ID }) type_id: number,
  ): any {
    return this.pubsub.asyncIterator(REVIEW_CREATED);
  }
}
