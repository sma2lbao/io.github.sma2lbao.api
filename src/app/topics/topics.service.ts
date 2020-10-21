import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository, In } from 'typeorm';
import { CreateTopicInput } from './dto/topics.dto';
import { BaseService } from '@/global/services/base.service';
import { ShadowsService } from '../shadows/shadows.service';
import { ShadowNotFoundException } from '@/global/exceptions/shadows/shadow.exception';

@Injectable()
export class TopicsService extends BaseService<Topic> {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly shadowsService: ShadowsService,
  ) {
    super(topicRepository);
  }

  async create(createTopic: CreateTopicInput): Promise<Topic> {
    const { top_shadow_id, top_shadows_ids, ...rest } = createTopic;
    const topic = this.topicRepository.create(rest);
    if (top_shadow_id) {
      const topShadow = await this.shadowsService.findOne({
        id: top_shadow_id,
      });
      if (!topShadow) {
        throw new ShadowNotFoundException();
      }
      topic.top_shadow = topShadow;
    }
    if (top_shadows_ids) {
      const topShadows = await this.shadowsService.find({
        where: {
          id: In(top_shadows_ids),
        },
      });
      if (!topShadows || topShadows.length !== top_shadows_ids.length) {
        throw new ShadowNotFoundException();
      }
      topic.top_shadows = topShadows;
    }
    return await this.topicRepository.save(topic);
  }
}
