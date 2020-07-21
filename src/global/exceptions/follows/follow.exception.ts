import { FollowExceptionStutus } from '../interfaces/exception.interface';
import { ExceptionWrap } from '../exception.wrap';

export const FollowException = ExceptionWrap(
  'Follow Exception',
  FollowExceptionStutus.ERROR,
);
