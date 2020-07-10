import { Module, OnModuleInit } from '@nestjs/common';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MediumsModule } from '../mediums/mediums.module';
import { MovieMedium } from './entities/movie_medium.entity';
import { CreateMovieInput } from './dto/movies.dto';
import { UsersService } from '@/core/users/users.service';
import { Like } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieMedium]), MediumsModule],
  providers: [MoviesResolver, MoviesService],
  exports: [MoviesService],
})
export class MoviesModule implements OnModuleInit {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit(): Promise<void> {
    for (let i = 1; i <= 99; i++) {
      const movie: CreateMovieInput = {
        title: `movie${i.toString().padStart(3, '0')}`,
        cover: `cover${i.toString().padStart(3, '0')}`,
      };
      const movieDB = await this.moviesService.findOne({
        title: movie.title,
        cover: movie.cover,
      });
      if (movieDB) {
        break;
      }
      let author = await this.usersService.findOne({
        username: 'admin',
      });
      if (!author) {
        author = await this.usersService.create({
          username: `admin`,
          password: '000000',
          email: `admin${i.toString().padStart(3, '0')}`,
        });
      }
      await this.moviesService.create(movie, author);
    }
  }
}
