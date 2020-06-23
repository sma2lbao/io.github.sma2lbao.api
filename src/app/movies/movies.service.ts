import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieInput } from './dto/movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovie: CreateMovieInput): Promise<Movie> {
    const movie = this.movieRepository.create(createMovie);
    return await this.movieRepository.save(movie);
  }
}
