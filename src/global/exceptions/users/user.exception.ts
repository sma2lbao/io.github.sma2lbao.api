import { UserExceptionStatus } from '../interfaces/exception.interface';
import { ExceptionWrap } from '../exception.wrap';

export const UserException = ExceptionWrap(
  'User Exception',
  UserExceptionStatus.ERROR,
);

export const UserUnauthorized = ExceptionWrap(
  'User Unauthorized',
  UserExceptionStatus.USER_UNAUTHORIZED,
);

export const UserNotFound = ExceptionWrap(
  'User Not Found Exception',
  UserExceptionStatus.USER_NOT_FOUND,
);

export const RegisterOtpDifferent = ExceptionWrap(
  'Register Otp Different Exception',
  UserExceptionStatus.REGISTER_OTP_DIFFERENT,
);
export const RegisterOtpNotExpired = ExceptionWrap(
  'Register Otp Not Expired Exception',
  UserExceptionStatus.REGISTER_OTP_NOT_EXPIRED,
);
