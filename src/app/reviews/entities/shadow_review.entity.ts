import { ObjectType } from '@nestjs/graphql';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Review } from './review.entity';
import { Shadow } from '@/app/shadows/entities/shadow.entity';
import { ReviewMedium } from '../interfaces/reviews.interface';

@ObjectType()
@ChildEntity(ReviewMedium.SHADOW)
export class ShadowReview extends Review {
  @ManyToOne(() => Shadow)
  shadow: Shadow;
}
