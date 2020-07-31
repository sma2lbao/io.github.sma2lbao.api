import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { MediumsModule } from '../mediums/mediums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), MediumsModule],
  providers: [VideosService, VideosResolver],
})
export class VideosModule {}
