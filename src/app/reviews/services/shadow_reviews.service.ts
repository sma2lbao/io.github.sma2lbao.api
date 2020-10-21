import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/global/services/base.service';
import { ShadowReview } from '../entities/shadow_review.entity';

@Injectable()
export class ShadowReviewsService extends BaseService<ShadowReview> {
  constructor(
    @InjectRepository(ShadowReview)
    private readonly shadowReviewRepository: Repository<ShadowReview>,
  ) {
    super(shadowReviewRepository);
  }
}
