import { InputType, Field, ID } from '@nestjs/graphql';
import { type } from 'os';

@InputType()
export class CreateTopicInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  top_movie_id?: number;

  @Field(() => [ID], { nullable: true })
  top_movies_ids?: number[];
}
