import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateMediumInput {
  @Field()
  name: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  alias_name?: string;

  @Field(() => [String], { nullable: true })
  posters?: string[];

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class CreateMovieMediumInput extends CreateMediumInput {
  @Field(() => ID, { nullable: true })
  movie_id?: number;
}
