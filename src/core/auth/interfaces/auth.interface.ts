export const jwtConstants = {
  secret: 'secretKey',
};

export interface UserJwtPayload {
  readonly uid: string;

  readonly username: string;

  readonly email: string;

  readonly nickname: string;

  readonly avatar: string;

  readonly mobile: string;
}
