import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';
import { ReviewMedium } from '../interfaces/reviews.interface';
import { Paginated } from '@/global/types/paginated.type';
import { Review } from '../entities/review.entity';

@InputType()
export class CreateReviewInput {
  @Field()
  content: string;

  @Field(() => ID, { nullable: true })
  author_uid: string;

  @Field(() => ReviewMedium)
  type: ReviewMedium;

  @Field(() => ID)
  medium_id: number;
}

@ObjectType()
export class ReviewPaginated extends Paginated(Review) {}
