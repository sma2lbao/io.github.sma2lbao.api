export enum BaseExceptionStatus {
  DEFAULT = 100000,
}

export enum MediumExceptionStatus {
  MEDIUM_DEFAULT = 200000,
  MEDIUM_NOT_FOUND = 200404,
}

export type ExceptionStatus = BaseExceptionStatus | MediumExceptionStatus;
