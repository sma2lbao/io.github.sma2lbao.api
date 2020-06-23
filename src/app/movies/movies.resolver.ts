import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/movies.dto';
import { MoviesService } from './movies.service';

@Resolver('Movies')
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(returns => Movie)
  async create_movie(
    @Args('movie') createMovie: CreateMovieInput,
  ): Promise<Movie> {
    return await this.moviesService.create(createMovie);
  }
}
