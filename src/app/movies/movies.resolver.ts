import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput, MoviePaginated } from './dto/movies.dto';
import { MoviesService } from './movies.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { PaginatedQuery } from '@/global/dto/paginated.dto';
import { CreateMovieMediumInput } from '../mediums/dto/mediums.dto';

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

  @Mutation(() => Movie)
  async add_mediums_to_movie(
    @Args('movie_id', { type: () => ID }) movie_id: number,
    @Args('movie_medium') movie_medium: CreateMovieMediumInput,
  ): Promise<Movie> {
    return await this.moviesService.addMediumsToMovie(movie_id, movie_medium);
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

  @Query(() => MoviePaginated)
  async user_movies_paginated(
    @Args('author_username') author_username: string,
    @Args('query', { nullable: true }) query: PaginatedQuery,
  ): Promise<MoviePaginated> {
    const result = await this.moviesService.findCursorPagition({
      query: query,
      key: 'create_at',
      where: {
        author: {
          username: author_username,
        },
      },
    });
    return result;
  }
}
