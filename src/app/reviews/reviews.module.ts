import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Reply } from './entities/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Reply])],
  providers: [ReviewsService, ReviewsResolver],
})
export class ReviewsModule {}
