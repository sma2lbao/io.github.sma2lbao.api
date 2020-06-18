export interface UserJwtPayload {
  readonly uid: string;

  readonly username: string;

  readonly email: string;

  readonly mobile: string;
}
