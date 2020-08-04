import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
