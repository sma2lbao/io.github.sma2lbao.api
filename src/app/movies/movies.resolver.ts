import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput, MoviePaginated } from './dto/movies.dto';
import { MoviesService } from './movies.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/gql-auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { PaginatedQuery } from '@/global/dto/paginated.dto';

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

  @Query(() => Movie)
  async movie(@Args('id', { type: () => ID }) id: number): Promise<Movie> {
    return await this.moviesService.findOne({ id: id });
  }

  @Query(() => MoviePaginated)
  async movies_paginated(
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<MoviePaginated> {
    const result = await this.moviesService.findCursorPagition({
      query: query,
      key: 'create_at',
    });
    return result;
  }
}
