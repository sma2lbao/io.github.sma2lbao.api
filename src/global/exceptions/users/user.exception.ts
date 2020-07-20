import { BaseException } from '../base.exception';
import { UserExceptionStatus } from '../interfaces/exception.interface';

export class UserException extends BaseException {
  constructor(
    objectOrError?: string | unknown | any,
    description?: string,
    status?: UserExceptionStatus,
  ) {
    super(
      objectOrError,
      description || 'User Error',
      status || UserExceptionStatus.USER_DEFAULT,
    );
  }
}
