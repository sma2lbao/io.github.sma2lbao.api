import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTopicInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  top_shadow_id?: number;

  @Field(() => [ID], { nullable: true })
  top_shadows_ids?: number[];
}
