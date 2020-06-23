import { Injectable } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { Movie } from '../movies/entities/movie.entity';
import { User } from '@/core/users/entities/user.entity';

@Injectable()
export class UrgesService {
  constructor(private readonly moviesService: MoviesService) {}

  async findMovieUrges(user?: User): Promise<Movie[]> {
    const movies = await this.moviesService.find({
      take: 10,
    });
    return movies;
  }
}
