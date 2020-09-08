import { Module, OnModuleInit } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsResolver } from './topics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicsService, TopicsResolver],
})
export class TopicsModule implements OnModuleInit {
  constructor(private readonly topicsService: TopicsService) {}

  async onModuleInit(): Promise<void> {
    const count = await this.topicsService.count();
    if (!count) {
      await this.topicsService.create({
        title: '精选',
        description: '精选描述',
        top_movie_id: 1,
        top_movies_ids: [1, 2, 3, 4, 5],
      });
    }
  }
}
