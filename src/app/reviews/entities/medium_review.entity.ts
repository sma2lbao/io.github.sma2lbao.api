import { ObjectType } from '@nestjs/graphql';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Review } from './review.entity';
import { ReviewMedium } from '../interfaces/reviews.interface';
import { Medium } from '@/app/mediums/entities/medium.entity';

@ObjectType()
@ChildEntity(ReviewMedium.MEDIUM)
export class MediumReview extends Review {
  @ManyToOne(() => Medium)
  medium: Medium;
}
