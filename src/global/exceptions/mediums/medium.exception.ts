import { MediumExceptionStatus } from '../interfaces/exception.interface';
import { ExceptionWrap } from '../exception.wrap';

export const MediumException = ExceptionWrap(
  'Medium Exception',
  MediumExceptionStatus.ERROR,
);

export const MediumNotFoundException = ExceptionWrap(
  'Medium Not Found Exception',
  MediumExceptionStatus.MEDIUM_NOT_FOUND,
);
