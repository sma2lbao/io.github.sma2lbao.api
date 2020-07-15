import { ObjectType } from '@nestjs/graphql';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Medium } from '@/app/mediums/entities/medium.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { ChildMedium } from '../interfaces/mediums.interface';

@ObjectType()
@ChildEntity(ChildMedium.MOVIE)
export class MovieMedium extends Medium {
  @ManyToOne(
    () => Movie,
    movie => movie.sources,
  )
  movie: Movie;
}
