import { Module } from '@nestjs/common';
import { MediumsService } from './mediums.service';
import { MovieMediumsService } from './movie_mediums.service';
import { MediumsResolver } from './mediums.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medium } from './entities/medium.entity';
import { MovieMedium } from './entities/movie_medium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medium, MovieMedium])],
  providers: [MediumsService, MovieMediumsService, MediumsResolver],
  exports: [MediumsService, MovieMediumsService],
})
export class MediumsModule {}
