import { Module } from '@nestjs/common';
import { MediumsService } from './services/mediums.service';
import { MovieMediumsService } from './services/movie_mediums.service';
import { MediumsResolver } from './mediums.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medium } from './entities/medium.entity';
import { MovieMedium } from './entities/movie_medium.entity';
import { VideoMedium } from './entities/video_medium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medium, MovieMedium, VideoMedium])],
  providers: [MediumsService, MovieMediumsService, MediumsResolver],
  exports: [MediumsService, MovieMediumsService],
})
export class MediumsModule {}
