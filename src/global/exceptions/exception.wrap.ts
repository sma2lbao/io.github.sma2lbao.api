import { HttpException } from '@nestjs/common';
import {
  ExceptionStatus,
  BaseExceptionStatus,
} from './interfaces/exception.interface';

export function ExceptionWrap(
  baseDescription?: string,
  baseStatus?: ExceptionStatus,
): any {
  class BaseException extends HttpException {
    constructor(
      objectOrError?: string | unknown | any,
      description?: string,
      status?: ExceptionStatus,
    ) {
      super(
        HttpException.createBody(
          objectOrError,
          description || baseDescription || 'Base Exception.',
          status || baseStatus || BaseExceptionStatus.ERROR,
        ),
        status || baseStatus || BaseExceptionStatus.ERROR,
      );
    }
  }
  return BaseException;
}
