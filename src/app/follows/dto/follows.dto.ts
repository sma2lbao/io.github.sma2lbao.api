import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@/global/types/paginated.type';
import { Follow } from '../entities/follow.entity';

@InputType()
export class CreateFollowInput {
  @Field(() => ID, { nullable: true })
  follower_uid?: string;

  @Field(() => ID)
  owner_uid: string;
}

@InputType()
export class DeleteFollowInput extends CreateFollowInput {}

@ObjectType()
export class FollowPaginated extends Paginated(Follow) {}
