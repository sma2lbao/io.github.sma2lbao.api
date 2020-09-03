import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Reply } from './entities/reply.entity';
import { MovieReview } from './entities/movie_review.entity';
import { MoviesModule } from '../movies/movies.module';
import { MovieReviewsService } from './services/movie_reviews.service';
import { MediumReview } from './entities/medium_review.entity';
import { MediumsModule } from '../mediums/mediums.module';
import { MediumReviewsService } from './services/medium_reviews.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Reply, MovieReview, MediumReview]),
    MoviesModule,
    MediumsModule,
  ],
  providers: [
    ReviewsService,
    MovieReviewsService,
    MediumReviewsService,
    ReviewsResolver,
  ],
})
export class ReviewsModule {}
