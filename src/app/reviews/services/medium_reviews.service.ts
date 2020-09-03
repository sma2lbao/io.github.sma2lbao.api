import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/global/services/base.service';
import { MediumReview } from '../entities/medium_review.entity';

@Injectable()
export class MediumReviewsService extends BaseService<MediumReview> {
  constructor(
    @InjectRepository(MediumReview)
    private readonly mediumReviewRepository: Repository<MediumReview>,
  ) {
    super(mediumReviewRepository);
  }
}
