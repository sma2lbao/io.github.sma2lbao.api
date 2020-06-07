import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async findUserByUid(uid: string): Promise<User> {
    return null;
  }
}
