import {
  ExceptionStatus,
  BaseExceptionStatus,
} from './interfaces/exception.interface';

export function ExceptionWrap(
  baseDescription?: string,
  baseStatus?: ExceptionStatus,
): any {
  class BaseException extends Error {
    private status: ExceptionStatus;
    private description: string;

    constructor(
      message?: string,
      description?: string,
      status?: ExceptionStatus,
    ) {
      super(message || description || baseDescription || 'Base Exception.');
      this.status = status || baseStatus || BaseExceptionStatus.ERROR;
      this.description = description || baseDescription || 'Base Exception.';
    }
  }
  return BaseException;
}
