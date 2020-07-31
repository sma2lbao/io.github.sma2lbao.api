import { Injectable } from '@nestjs/common';
import { BaseService } from '@/global/services/base.service';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVideoInput, UpdateVideoInput } from './dto/videos.dto';
import { User } from '@/core/users/entities/user.entity';
import { UserNotFound } from '@/global/exceptions/users/user.exception';
import { CreateVideoMediumInput } from '../mediums/dto/mediums.dto';
import { EntityNotFoundException } from '@/global/exceptions/base.exception';
import { VideoMediumsService } from '../mediums/services/video_mediums.service';

@Injectable()
export class VideosService extends BaseService<Video> {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly videoMediumsService: VideoMediumsService,
  ) {
    super(videoRepository);
  }

  async create(createVideo: CreateVideoInput, author?: User): Promise<Video> {
    const { sources, ...rest } = createVideo;
    const video = this.videoRepository.create(rest);
    if (!author) {
      throw new UserNotFound();
    }
    if (sources && sources.length > 0) {
      const videoMediums = await this.videoMediumsService.create(sources);
      video.sources = videoMediums;
    }
    video.author = author;
    return await this.videoRepository.save(video);
  }

  async updateById(
    video_id: number,
    updateVideo: UpdateVideoInput,
    author?: User,
  ): Promise<Video> {
    const video = await this.videoRepository.findOne(video_id);
    const saveVideo = this.videoRepository.merge(video, updateVideo);
    return await this.create(saveVideo, author);
  }

  async addMediumsToVideo(
    video_id: number,
    createVideoMedium: CreateVideoMediumInput,
  ): Promise<Video> {
    const video = await this.videoRepository.findOne(video_id);
    const videoMedium = await this.videoMediumsService.create(
      createVideoMedium,
    );
    if (!video || !videoMedium) {
      throw new EntityNotFoundException();
    }
    await this.videoRepository
      .createQueryBuilder()
      .relation('sources')
      .of(video)
      .add(videoMedium);
    return await this.videoRepository.findOne(video_id);
  }
}
