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
  public posters?: string[];

  @Field({ nullable: true })
  public description?: string;
}
