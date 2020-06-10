import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  findUserByToken(token: string): any {
    throw new Error('Method not implemented.');
  }
  findUserByUsernameAndPassword(username: string, password: string): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findUserByUid(uid: string): Promise<User> {
    return null;
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
}
