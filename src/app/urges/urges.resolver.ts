import { Resolver, Query } from '@nestjs/graphql';
import { Movie } from '../movies/entities/movie.entity';
import { UseGuards } from '@nestjs/common';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { UrgesService } from './urges.service';
import { GqlJwtAuthGuard } from '@/core/auth/guards/gql-auth.guard';

@Resolver('Urges')
export class UrgesResolver {
  constructor(private readonly urgesService: UrgesService) {}

  @Query(returns => [Movie])
  @UseGuards(GqlJwtAuthGuard)
  async movie_urges(@CurrUser() user?: User): Promise<Movie[]> {
    return await this.urgesService.findMovieUrges(user);
  }
}
