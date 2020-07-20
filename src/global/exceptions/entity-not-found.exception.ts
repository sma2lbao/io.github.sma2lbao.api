import { BaseExceptionStatus } from './interfaces/exception.interface';
import { BaseException } from './base.exception';

export class EntityNotFoundException extends BaseException {
  constructor(objectOrError?: string | unknown | any, description?: string) {
    super(
      objectOrError,
      description || 'Entity Not Found',
      BaseExceptionStatus.ENTITY_NOT_FOUND,
    );
  }
}
