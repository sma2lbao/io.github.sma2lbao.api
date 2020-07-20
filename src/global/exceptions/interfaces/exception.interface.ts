export enum BaseExceptionStatus {
  DEFAULT = 100000,
  ENTITY_NOT_FOUND = 100404,
}

export enum MediumExceptionStatus {
  MEDIUM_DEFAULT = 200000,
  MEDIUM_NOT_FOUND = 200404,
}

export enum UserExceptionStatus {
  USER_DEFAULT = 300000,
  USER_NOT_FOUND = 300404,
}

export type ExceptionStatus =
  | BaseExceptionStatus
  | MediumExceptionStatus
  | UserExceptionStatus;
