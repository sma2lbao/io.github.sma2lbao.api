import { registerEnumType } from '@nestjs/graphql';

export enum VoteStatus {
  LIKD = 'like',
  DISLIKE = 'dislike',
  DEFAULT = 'default',
}

registerEnumType(VoteStatus, {
  name: 'VoteStatus',
});
