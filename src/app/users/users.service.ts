import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async findUserByUid(uid: string): Promise<User> {
    return null;
  }
}
