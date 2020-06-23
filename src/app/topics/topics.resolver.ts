import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Topic } from './entities/topic.entity';
import { CreateTopicInput } from './dto/topics.dto';
import { TopicsService } from './topics.service';

@Resolver('Topics')
export class TopicsResolver {
  constructor(private readonly topicsService: TopicsService) {}

  @Mutation(returns => Topic)
  async create_topic(
    @Args('topic') createTopic: CreateTopicInput,
  ): Promise<Topic> {
    return await this.topicsService.create(createTopic);
  }
}
