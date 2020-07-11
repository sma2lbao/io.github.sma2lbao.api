import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field()
  content: string;

  @Field(() => ID)
  author_uid: string;
}
