import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@/global/types/paginated.type';
import { Reply } from '../entities/reply.entity';

@InputType()
export class CreateReplyInput {
  @Field()
  content: string;

  @Field(() => ID)
  review_id: number;

  @Field(() => ID, { nullable: true })
  author_uid: string;

  @Field(() => ID, { nullable: true })
  replyto_uid: string;
}

@ObjectType()
export class ReplyPaginated extends Paginated(Reply) {}
