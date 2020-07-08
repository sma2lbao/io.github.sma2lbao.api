import { InputType, Field } from '@nestjs/graphql';
import { type } from 'os';

@InputType()
export class CreateCategoryInput {
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
