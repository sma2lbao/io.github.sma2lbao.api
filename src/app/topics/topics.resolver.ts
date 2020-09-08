import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Topic } from './entities/topic.entity';
import { CreateTopicInput } from './dto/topics.dto';
import { TopicsService } from './topics.service';

@Resolver('Topics')
export class TopicsResolver {
  constructor(private readonly topicsService: TopicsService) {}

  @Mutation(() => Topic)
  async create_topic(
    @Args('topic') createTopic: CreateTopicInput,
  ): Promise<Topic> {
    return await this.topicsService.create(createTopic);
  }

  // TODO
  @Query(() => Topic)
  async current_topic(): Promise<Topic> {
    return await this.topicsService.findOne({
      order: {
        create_at: -1,
      },
    });
  }
}
