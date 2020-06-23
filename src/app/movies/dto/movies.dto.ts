import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;
}
