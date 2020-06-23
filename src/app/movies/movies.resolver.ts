import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/movies.dto';
import { MoviesService } from './movies.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/gql-auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';

@Resolver('Movies')
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(returns => Movie)
  @UseGuards(GqlJwtAuthGuard)
  async create_movie(
    @Args('movie') createMovie: CreateMovieInput,
    @CurrUser() user: User,
  ): Promise<Movie> {
    return await this.moviesService.create(createMovie, user);
  }
}
