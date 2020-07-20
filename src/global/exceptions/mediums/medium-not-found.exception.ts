import { MediumExceptionStatus } from '../interfaces/exception.interface';
import { MediumException } from './medium.exception';

export class MediumNotFoundException extends MediumException {
  constructor(objectOrError?: string | unknown | any, description?: string) {
    super(
      objectOrError,
      description || 'Medium Not Found',
      MediumExceptionStatus.MEDIUM_NOT_FOUND,
    );
  }
}
