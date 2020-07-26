import { ObjectType } from '@nestjs/graphql';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Medium } from '@/app/mediums/entities/medium.entity';
import { ChildMedium } from '../interfaces/mediums.interface';
import { Video } from '@/app/videos/entities/video.entity';

@ObjectType()
@ChildEntity(ChildMedium.VIDEO)
export class VideoMedium extends Medium {
  @ManyToOne(
    () => Video,
    video => video.sources,
  )
  video: Video;
}
