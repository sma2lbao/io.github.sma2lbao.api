import { Module } from '@nestjs/common';
import { MediumsService } from './services/mediums.service';
import { MovieMediumsService } from './services/movie_mediums.service';
import { MediumsResolver } from './mediums.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medium } from './entities/medium.entity';
import { MovieMedium } from './entities/movie_medium.entity';
import { VideoMedium } from './entities/video_medium.entity';
import { VideoMediumsService } from './services/video_mediums.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medium, MovieMedium, VideoMedium])],
  providers: [
    MediumsService,
    MovieMediumsService,
    MediumsResolver,
    VideoMediumsService,
  ],
  exports: [MediumsService, MovieMediumsService, VideoMediumsService],
})
export class MediumsModule {}
