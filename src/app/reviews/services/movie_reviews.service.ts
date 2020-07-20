import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/global/services/base.service';
import { MovieReview } from '../entities/movie_review.entity';

@Injectable()
export class MovieReviewsService extends BaseService<MovieReview> {
  constructor(
    @InjectRepository(MovieReview)
    private readonly movieReviewRepository: Repository<MovieReview>,
  ) {
    super(movieReviewRepository);
  }
}
