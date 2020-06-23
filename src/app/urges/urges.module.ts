import { Module } from '@nestjs/common';
import { UrgesResolver } from './urges.resolver';
import { UrgesService } from './urges.service';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [MoviesModule],
  providers: [UrgesResolver, UrgesService],
})
export class UrgesModule {}
