import { InputType, Field, Int, IntersectionType } from '@nestjs/graphql';

@InputType()
class PaginatedASCQuery {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field({ nullable: true })
  after?: string;
}

@InputType()
class PaginatedDESCQuery {
  @Field(() => Int, { nullable: true })
  last?: number;

  @Field({ nullable: true })
  before?: string;
}

@InputType()
export class PaginatedQuery extends IntersectionType(
  PaginatedASCQuery,
  PaginatedDESCQuery,
) {}
