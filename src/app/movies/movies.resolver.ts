import { Resolver, Mutation, Args, ID, Query, Int } from '@nestjs/graphql';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput, MoviePaginated } from './dto/movies.dto';
import { MoviesService } from './movies.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/gql-auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import * as moment from 'moment';

@Resolver('Movies')
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => Movie)
  @UseGuards(GqlJwtAuthGuard)
  async create_movie(
    @Args('movie') createMovie: CreateMovieInput,
    @CurrUser() user: User,
  ): Promise<Movie> {
    return await this.moviesService.create(createMovie, user);
  }

  @Query(returns => Movie)
  async movie(@Args('id', { type: () => ID }) id: number): Promise<Movie> {
    return await this.moviesService.findOneByConditions({ id: id });
  }

  @Query(returns => MoviePaginated)
  async movies_paginated(
    @Args({ name: 'first', type: () => Int, nullable: true }) frist: number,
    @Args('after', { nullable: true }) after: string,
  ): Promise<MoviePaginated> {
    const [movies, total]: [
      Movie[],
      number,
    ] = await this.moviesService.findPagitionByDate(
      frist,
      after
        ? moment(Buffer.from(after, 'base64').toString('ascii'), 'x').toDate()
        : undefined,
    );
    const result: MoviePaginated = {
      edges: movies.map(movie => {
        return {
          node: movie,
          cursor: Buffer.from(moment(movie.create_at).format('x')).toString(
            'base64',
          ),
        };
      }),
      hasNextPage: total > movies.length,
    };
    return result;
  }
}
