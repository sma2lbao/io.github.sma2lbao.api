import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateFollowInput {
  @Field(() => ID, { nullable: true })
  follower_uid?: string;

  @Field(() => ID)
  owner_uid: string;
}

@InputType()
export class DeleteFollowInput extends CreateFollowInput {}
