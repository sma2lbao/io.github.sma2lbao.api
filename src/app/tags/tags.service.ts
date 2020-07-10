import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagInput } from './dto/tags.dto';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsReposity: Repository<Tag>,
    private readonly moviesService: MoviesService,
  ) {}

  async created(createTag: CreateTagInput): Promise<Tag> {
    const tag = this.tagsReposity.create(createTag);
    return await this.tagsReposity.save(tag);
  }

  async addMovieToPlaylist(movie_id: number, tag_id: number): Promise<boolean> {
    const movie = await this.moviesService.findOne({
      id: movie_id,
    });
    const tag = await this.tagsReposity.findOne({
      id: tag_id,
    });
    if (!movie || !tag) {
      throw new Error();
    }
    await this.tagsReposity
      .createQueryBuilder()
      .relation('movies')
      .of(tag)
      .add(movie);
    return true;
  }
}
