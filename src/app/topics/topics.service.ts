import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { CreateTopicInput } from './dto/topics.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async create(createTopic: CreateTopicInput): Promise<Topic> {
    const topic = this.topicRepository.create(createTopic);
    return await this.topicRepository.save(topic);
  }
}
