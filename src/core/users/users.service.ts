import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/users.dto';
import { Cache } from 'cache-manager';
import { LOGIN_OTP_PREFIX } from './constants/users.constant';
import { MailerService } from '../mailer/mailer.service';
import { SentMessageInfo } from 'nodemailer/lib/smtp-connection';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly mailerService: MailerService,
  ) {}

  findUserByToken(token: string): any {
    throw new Error('Method not implemented.');
  }
  findUserByUsernameAndPassword(username: string, password: string): any {
    throw new Error('Method not implemented.');
  }

  create(createUser: CreateUserInput): Promise<User> {
    throw new Error('Method not implemented.');
  }

  createWithCode(createUserWithCode: any): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async sendRegisterEmail(email: string): Promise<string> {
    const opt = '12345';
    const codeOfStore = await this.cache.get(LOGIN_OTP_PREFIX + email);
    if (codeOfStore) {
      throw new Error();
    }
    await this.cache.set(LOGIN_OTP_PREFIX + email, opt, { ttl: 24 * 60 * 60 });
    const result = await this.mailerService.sendRegisterEmailTemplate(email);
    return result.response;
  }

  async findUserByUid(uid: string): Promise<User> {
    return null;
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
}
