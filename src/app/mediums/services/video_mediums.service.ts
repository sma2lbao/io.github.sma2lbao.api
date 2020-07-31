import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/global/services/base.service';
import { VideoMedium } from '../entities/video_medium.entity';
import { CreateVideoMediumInput } from '../dto/mediums.dto';

@Injectable()
export class VideoMediumsService extends BaseService<VideoMedium> {
  constructor(
    @InjectRepository(VideoMedium)
    private readonly videoMediumRepository: Repository<VideoMedium>,
  ) {
    super(videoMediumRepository);
  }

  async create(
    createVideoMediums: CreateVideoMediumInput[],
  ): Promise<VideoMedium[]>;
  async create(createVideoMedium: CreateVideoMediumInput): Promise<VideoMedium>;
  async create(mediumOrMediums: unknown): Promise<any> {
    const entityOrEntities = this.videoMediumRepository.create(mediumOrMediums);
    return await this.videoMediumRepository.save(entityOrEntities);
  }
}
