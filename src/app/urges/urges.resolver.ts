import { Resolver, Query } from '@nestjs/graphql';
import { Movie } from '../movies/entities/movie.entity';
import { UseGuards } from '@nestjs/common';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { UrgesService } from './urges.service';
import { JwtAuthGuard } from '@/core/auth/guards/auth.guard';

@Resolver('Urges')
export class UrgesResolver {
  constructor(private readonly urgesService: UrgesService) {}

  @Query(() => [Movie])
  @UseGuards(JwtAuthGuard({ required: false }))
  async movie_urges(@CurrUser() user?: User): Promise<Movie[]> {
    return await this.urgesService.findMovieUrges(user);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard({ required: false }))
  async user_urges(@CurrUser() user?: User): Promise<User[]> {
    return await this.urgesService.findUserUrges(user);
  }
}
