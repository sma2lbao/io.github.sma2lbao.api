import { Module } from '@nestjs/common';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MediumsModule } from '../mediums/mediums.module';
import { MovieMedium } from './entities/movie_medium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieMedium]), MediumsModule],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
