import { MovieExceptionStatus } from '../interfaces/exception.interface';
import { ExceptionWrap } from '../exception.wrap';

export const MovieException = ExceptionWrap(
  'Movie Exception',
  MovieExceptionStatus.ERROR,
);

export const MovieNotFoundException = ExceptionWrap(
  'Movie Not Found Exception',
  MovieExceptionStatus.MEDIUM_NOT_FOUND,
);
