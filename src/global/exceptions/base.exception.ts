import { ExceptionWrap } from './exception.wrap';
import { BaseExceptionStatus } from './interfaces/exception.interface';

export const EntityNotFoundException = ExceptionWrap(
  'Entity Not Found Exception',
  BaseExceptionStatus.ENTITY_NOT_FOUND,
);
