import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository, In } from 'typeorm';
import { CreateTopicInput } from './dto/topics.dto';
import { BaseService } from '@/global/services/base.service';
import { MoviesService } from '../movies/movies.service';
import { MovieNotFoundException } from '@/global/exceptions/movies/movie.exception';

@Injectable()
export class TopicsService extends BaseService<Topic> {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly moviesService: MoviesService,
  ) {
    super(topicRepository);
  }

  async create(createTopic: CreateTopicInput): Promise<Topic> {
    const { top_movie_id, top_movies_ids, ...rest } = createTopic;
    const topic = this.topicRepository.create(rest);
    if (top_movie_id) {
      const topMovie = await this.moviesService.findOne({
        id: top_movie_id,
      });
      if (!topMovie) {
        throw new MovieNotFoundException();
      }
      topic.top_movie = topMovie;
    }
    if (top_movies_ids) {
      const topMovies = await this.moviesService.find({
        where: {
          id: In(top_movies_ids),
        },
      });
      if (!topMovies || topMovies.length !== top_movies_ids.length) {
        throw new MovieNotFoundException();
      }
      topic.top_movies = topMovies;
    }
    return await this.topicRepository.save(topic);
  }
}
