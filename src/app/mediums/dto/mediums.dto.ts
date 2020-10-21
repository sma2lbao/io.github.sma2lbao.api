import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateMediumInput {
  @Field()
  name: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  alias_name?: string;

  @Field({ nullable: true })
  cover?: string;

  @Field(() => [String], { nullable: true })
  posters?: string[];

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class CreateShadowMediumInput extends CreateMediumInput {
  @Field(() => ID, { nullable: true })
  shadow_id?: number;
}

@InputType()
export class CreateVideoMediumInput extends CreateMediumInput {
  @Field(() => ID, { nullable: true })
  video_id?: number;
}
