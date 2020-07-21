import { UserExceptionStatus } from '../interfaces/exception.interface';
import { ExceptionWrap } from '../exception.wrap';

export const UserException = ExceptionWrap(
  'User Exception',
  UserExceptionStatus.ERROR,
);

export const UserNotFoundException = ExceptionWrap(
  'User Not Found Exception',
  UserExceptionStatus.USER_NOT_FOUND,
);
