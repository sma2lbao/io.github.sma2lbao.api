import { ShadowExceptionStatus } from '../interfaces/exception.interface';
import { ExceptionWrap } from '../exception.wrap';

export const ShadowException = ExceptionWrap(
  'Shadow Exception',
  ShadowExceptionStatus.ERROR,
);

export const ShadowNotFoundException = ExceptionWrap(
  'Shadow Not Found Exception',
  ShadowExceptionStatus.MEDIUM_NOT_FOUND,
);
