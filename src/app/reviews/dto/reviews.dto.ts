import { InputType, Field, ID } from '@nestjs/graphql';
import { ReviewMedium } from '../interfaces/reviews.interface';

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
