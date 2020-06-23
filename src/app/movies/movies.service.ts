import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository, FindConditions, MoreThan, FindManyOptions } from 'typeorm';
import { CreateMovieInput } from './dto/movies.dto';
import { User } from '@/core/users/entities/user.entity';
import { MediumsService } from '../mediums/mediums.service';
import { CreateMediumInput } from '../mediums/dto/mediums.dto';
import { MovieMedium } from './entities/movie_medium.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieMedium)
    private readonly movieMediumRepository: Repository<MovieMedium>,
    private readonly mediumsService: MediumsService,
  ) {}

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

  async findOneByConditions(condtions: FindConditions<Movie>): Promise<Movie> {
    return await this.movieRepository.findOne(condtions);
  }

  async findByConditions(condtions: FindConditions<Movie>): Promise<Movie[]> {
    return await this.movieRepository.find(condtions);
  }

  async find(query: FindManyOptions<Movie>): Promise<Movie[]> {
    return await this.movieRepository.find(query);
  }

  async findPagitionByDate(
    limit = 10,
    after: Date,
  ): Promise<[Movie[], number]> {
    let condition = {};
    if (after) {
      condition = {
        create_at: MoreThan(after),
      };
    }
    return await this.movieRepository.findAndCount({
      take: limit,
      order: {
        create_at: 'ASC',
      },
      where: condition,
    });
  }
}
