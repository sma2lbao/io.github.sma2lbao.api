import { ObjectType } from '@nestjs/graphql';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Medium } from '@/app/mediums/entities/medium.entity';
import { Movie } from './movie.entity';

@ObjectType()
@ChildEntity()
export class MovieMedium extends Medium {
  @ManyToOne(
    () => Movie,
    movie => movie.sources,
  )
  movie: Movie;
}
