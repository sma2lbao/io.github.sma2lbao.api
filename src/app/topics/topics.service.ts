import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository, FindConditions, FindManyOptions } from 'typeorm';
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

  async findOneByConditions(condtions: FindConditions<Topic>): Promise<Topic> {
    return await this.topicRepository.findOne(condtions);
  }

  async findByConditions(condtions: FindConditions<Topic>): Promise<Topic[]> {
    return await this.topicRepository.find(condtions);
  }

  async find(query: FindManyOptions<Topic>): Promise<Topic[]> {
    return await this.topicRepository.find(query);
  }
}
