import { HttpException } from '@nestjs/common';
import {
  ExceptionStatus,
  BaseExceptionStatus,
} from './interfaces/exception.interface';

export abstract class BaseException extends HttpException {
  constructor(
    objectOrError?: string | unknown | any,
    description?: string,
    status?: ExceptionStatus,
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        status || BaseExceptionStatus.DEFAULT,
      ),
      status || BaseExceptionStatus.DEFAULT,
    );
  }
}
