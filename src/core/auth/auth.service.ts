import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(username: string, password: string) {
    throw new Error('Method not implemented.');
  }
  getUserByUid(uid: string) {
    throw new Error('Method not implemented.');
  }
}
