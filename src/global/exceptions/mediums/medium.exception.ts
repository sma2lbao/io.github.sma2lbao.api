import { BaseException } from '../base.exception';
import { MediumExceptionStatus } from '../interfaces/exception.interface';

export class MediumException extends BaseException {
  constructor(
    objectOrError?: string | unknown | any,
    description?: string,
    status?: MediumExceptionStatus,
  ) {
    super(
      objectOrError,
      description || 'Medium Error',
      status || MediumExceptionStatus.MEDIUM_DEFAULT,
    );
  }
}
