import { ObjectType } from '@nestjs/graphql';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Review } from './review.entity';
import { Movie } from '@/app/movies/entities/movie.entity';
import { ReviewMedium } from '../interfaces/reviews.interface';

@ObjectType()
@ChildEntity(ReviewMedium.MOVIE)
export class MovieReview extends Review {
  @ManyToOne(() => Movie)
  movie: Movie;
}
