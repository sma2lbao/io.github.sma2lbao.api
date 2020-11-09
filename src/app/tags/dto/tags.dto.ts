import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field()
  readonly label: string;

  @Field({ nullable: true })
  readonly alias?: string;

  @Field({ nullable: true })
  readonly description?: string;
}
