import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaylistInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  cover: string;
}
