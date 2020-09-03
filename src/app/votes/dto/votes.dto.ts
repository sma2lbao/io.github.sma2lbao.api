import { InputType, Field } from '@nestjs/graphql';
import { VoteStatus } from '../interfaces/votes.interface';

@InputType()
export class CreateVoteInput {
  @Field()
  medium_id: number;

  @Field(() => VoteStatus)
  status: VoteStatus;

  @Field({ nullable: true })
  owner_uid: string;
}
