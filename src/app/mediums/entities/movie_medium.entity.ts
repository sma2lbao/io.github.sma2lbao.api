import { ObjectType } from '@nestjs/graphql';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Medium } from './medium.entity';
import { Movie } from '@/app/movies/entities/movie.entity';

@ObjectType()
@ChildEntity()
export class MovieMedium extends Medium {
  @ManyToOne(
    type => Movie,
    movie => movie.sources,
  )
  movie: Movie;
}
