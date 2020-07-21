export enum BaseExceptionStatus {
  ERROR = 100000,
  ENTITY_NOT_FOUND = 100404,
}

export enum MediumExceptionStatus {
  ERROR = 200000,
  MEDIUM_NOT_FOUND = 200404,
}

export enum UserExceptionStatus {
  ERROR = 300000,
  USER_NOT_FOUND = 300404,
}

export enum FollowExceptionStutus {
  ERROR = 400000,
  FOLLOWER_OWNER_REPEAT = 400001,
}

export type ExceptionStatus =
  | BaseExceptionStatus
  | MediumExceptionStatus
  | UserExceptionStatus
  | FollowExceptionStutus;
