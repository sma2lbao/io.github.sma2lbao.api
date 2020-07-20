import { UserException } from './user.exception';
import { UserExceptionStatus } from '../interfaces/exception.interface';

export class UserNotFoundException extends UserException {
  constructor(objectOrError?: string | unknown | any, description?: string) {
    super(
      objectOrError,
      description || 'User Not Found',
      UserExceptionStatus.USER_NOT_FOUND,
    );
  }
}
