import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieInput } from './dto/movies.dto';
import { User } from '@/core/users/entities/user.entity';
import { MediumsService } from '../mediums/mediums.service';
import { MovieMedium } from './entities/movie_medium.entity';
import { BaseService } from '@/global/services/base.service';

@Injectable()
export class MoviesService extends BaseService<Movie> {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieMedium)
    private readonly movieMediumRepository: Repository<MovieMedium>,
    private readonly mediumsService: MediumsService,
  ) {
    super(movieRepository);
  }

  async create(createMovie: CreateMovieInput, author?: User): Promise<Movie> {
    const { source_ids, sources, ...rest } = createMovie;
    const movie = this.movieRepository.create(rest);
    if (!author) {
      throw new Error();
    }
    // TODO
    // if (source_ids && source_ids.length > 0) {
    // }
    if (sources && sources.length > 0) {
      const createMovieMediums = this.movieMediumRepository.create(sources);
      const movieMediums = await this.movieRepository.save(createMovieMediums);
      movie.sources = movieMediums;
    }
    movie.author = author;
    return await this.movieRepository.save(movie);
  }
}
