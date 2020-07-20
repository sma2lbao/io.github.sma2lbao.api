import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Reply } from './entities/reply.entity';
import { MovieReview } from './entities/movie_review.entity';
import { MoviesModule } from '../movies/movies.module';
import { MovieReviewsService } from './services/movie_reviews.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Reply, MovieReview]),
    MoviesModule,
  ],
  providers: [ReviewsService, MovieReviewsService, ReviewsResolver],
})
export class ReviewsModule {}
