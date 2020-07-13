import { Injectable } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { Movie } from '../movies/entities/movie.entity';
import { User } from '@/core/users/entities/user.entity';
import { UsersService } from '@/core/users/users.service';

@Injectable()
export class UrgesService {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly usersService: UsersService,
  ) {}

  async findMovieUrges(user?: User): Promise<Movie[]> {
    const movies = await this.moviesService.find({
      take: 10,
    });
    return movies;
  }

  async findUserUrges(user?: User): Promise<User[]> {
    const users = await this.usersService.find({
      take: 3,
    });
    return users;
  }
}
