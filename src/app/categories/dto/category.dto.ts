import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  readonly mark: string;

  @Field()
  readonly label: string;

  @Field({ nullable: true })
  alias?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  parent_id?: number;

  @Field(() => [CreateCategoryInput], { nullable: true })
  children?: CreateCategoryInput[];
}
