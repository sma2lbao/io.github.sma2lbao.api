import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieMediumInput } from '../dto/mediums.dto';
import { BaseService } from '@/global/services/base.service';
import { MovieMedium } from '../entities/movie_medium.entity';

@Injectable()
export class MovieMediumsService extends BaseService<MovieMedium> {
  constructor(
    @InjectRepository(MovieMedium)
    private readonly movieMediumRepository: Repository<MovieMedium>,
  ) {
    super(movieMediumRepository);
  }

  async create(
    createMovieMediums: CreateMovieMediumInput[],
  ): Promise<MovieMedium[]>;
  async create(createMovieMedium: CreateMovieMediumInput): Promise<MovieMedium>;
  async create(mediumOrMediums: unknown): Promise<any> {
    const entityOrEntities = this.movieMediumRepository.create(mediumOrMediums);
    return await this.movieMediumRepository.save(entityOrEntities);
  }
}
