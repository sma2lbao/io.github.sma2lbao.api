import { FollowExceptionStutus } from '../interfaces/exception.interface';
import { ExceptionWrap } from '../exception.wrap';

export const FollowException = ExceptionWrap(
  'Follow Exception',
  FollowExceptionStutus.ERROR,
);

export const FollowerOwnerRepeat = ExceptionWrap(
  'Follower Owner Repeat Exception',
  FollowExceptionStutus.FOLLOWER_OWNER_REPEAT,
);

export const FollowNotFound = ExceptionWrap(
  'Follow Not Found Exception',
  FollowExceptionStutus.FOLLOW_NOT_FOUND,
);
