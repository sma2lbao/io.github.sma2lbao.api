import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMediumInput {
  @Field()
  name: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  alias_name?: string;

  @Field(type => [String], { nullable: true })
  posters?: string[];

  @Field({ nullable: true })
  description?: string;
}
