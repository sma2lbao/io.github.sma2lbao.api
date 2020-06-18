import { InputType, OmitType, Field } from '@nestjs/graphql';
import { Tag } from '../entities/tag.entity';

@InputType()
export class CreateTagInput {
  @Field()
  readonly label: string;

  @Field({ nullable: true })
  readonly description?: string;
}
