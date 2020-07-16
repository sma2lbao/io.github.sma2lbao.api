import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository, In } from 'typeorm';
import { CreateMovieInput, UpdateMovieInput } from './dto/movies.dto';
import { User } from '@/core/users/entities/user.entity';
import { BaseService } from '@/global/services/base.service';
import { MovieMediumsService } from '../mediums/movie_mediums.service';
import { CreateMovieMediumInput } from '../mediums/dto/mediums.dto';

@Injectable()
export class MoviesService extends BaseService<Movie> {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly movieMediumsService: MovieMediumsService,
  ) {
    super(movieRepository);
  }

  async create(createMovie: CreateMovieInput, author?: User): Promise<Movie> {
    const { sources, ...rest } = createMovie;
    const movie = this.movieRepository.create(rest);
    if (!author) {
      throw new Error();
    }
    // TODO
    // if (source_ids && source_ids.length > 0) {
    //   const sources = await this.movieMediumsService.find({
    //     where: {
    //       id: In(source_ids),
    //     },
    //   });
    //   if (sources.length !== source_ids.length) {
    //     throw new Error();
    //   }
    //   movie.sources = sources;
    // }
    if (sources && sources.length > 0) {
      const movieMediums = await this.movieMediumsService.create(sources);
      movie.sources = movieMediums;
    }
    movie.author = author;
    return await this.movieRepository.save(movie);
  }

  async updateById(
    movie_id: number,
    updateMovie: UpdateMovieInput,
    author?: User,
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOne(movie_id);
    const saveMovie = this.movieRepository.merge(movie, updateMovie);
    return await this.create(saveMovie, author);
  }

  async addMediumsToMovie(
    movie_id: number,
    createMovieMedium: CreateMovieMediumInput,
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOne(movie_id);
    const movieMedium = await this.movieMediumsService.create(
      createMovieMedium,
    );
    if (!movie || !movieMedium) {
      throw new Error();
    }
    await this.movieRepository
      .createQueryBuilder()
      .relation('sources')
      .of(movie)
      .add(movieMedium);
    return await this.movieRepository.findOne(movie_id);
  }
}
