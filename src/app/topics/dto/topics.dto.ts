import { InputType, Field, ID } from '@nestjs/graphql';
import { type } from 'os';

@InputType()
export class CreateTopicInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => ID, { nullable: true })
  top_movie_id?: number;

  @Field(type => [ID], { nullable: true })
  top_movies_ids?: number[];
}
