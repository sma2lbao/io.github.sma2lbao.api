import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { CreateTopicInput } from './dto/topics.dto';
import { BaseService } from '@/global/services/base.service';

@Injectable()
export class TopicsService extends BaseService<Topic> {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {
    super(topicRepository);
  }

  async create(createTopic: CreateTopicInput): Promise<Topic> {
    const topic = this.topicRepository.create(createTopic);
    return await this.topicRepository.save(topic);
  }
}
