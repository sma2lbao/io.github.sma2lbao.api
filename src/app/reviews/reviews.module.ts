import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Reply } from './entities/reply.entity';
import { ShadowReview } from './entities/shadow_review.entity';
import { ShadowsModule } from '../shadows/shadows.module';
import { ShadowReviewsService } from './services/shadow_reviews.service';
import { MediumReview } from './entities/medium_review.entity';
import { MediumsModule } from '../mediums/mediums.module';
import { MediumReviewsService } from './services/medium_reviews.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Reply, ShadowReview, MediumReview]),
    ShadowsModule,
    MediumsModule,
  ],
  providers: [
    ReviewsService,
    ShadowReviewsService,
    MediumReviewsService,
    ReviewsResolver,
  ],
})
export class ReviewsModule {}
