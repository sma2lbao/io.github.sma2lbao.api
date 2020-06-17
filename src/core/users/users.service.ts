import { Injectable, Inject, CACHE_MANAGER, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, MoreThan, MoreThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput, CreateUserWithCodeInput } from './dto/users.dto';
import { Cache } from 'cache-manager';
import { LOGIN_OTP_PREFIX } from './constants/users.constant';
import { MailerService } from '../mailer/mailer.service';
import * as randomize from 'randomatic';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly mailerService: MailerService,
  ) {}

  async findAll(take = 10, after: string): Promise<[User[], number]> {
    console.log(take, after);
    return await this.usersRepository.findAndCount({
      take: take,
    });
  }

  async findPagitionByUid(
    limit = 10,
    after: string,
  ): Promise<[User[], number]> {
    console.log(after);
    return await this.usersRepository.findAndCount({
      take: limit,
      order: {
        uid: 'ASC',
      },
      where: after
        ? {
            uid: MoreThan(after),
          }
        : undefined,
    });
  }

  async findPagitionByDate(limit = 10, after: Date): Promise<[User[], number]> {
    const query = this.usersRepository.createQueryBuilder('user');
    if (after) {
      const users = await query
        .take(limit)
        .orderBy('user.create_at', 'ASC')
        // unix_timestamp(user.create_at)
        .where('user.create_at > :after', {
          after: after,
        })
        .getMany();
      return [users, 20];
    } else {
      const users = await query
        .take(limit)
        .orderBy('user.create_at', 'ASC')
        .getMany();
      return [users, 20];
    }
  }

  findUserByToken(token: string): any {
    throw new Error('Method not implemented.');
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    const user: User = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new Error();
    }
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      return user;
    } else {
      throw new Error();
    }
  }

  async create(createUser: CreateUserInput): Promise<User> {
    const user = await this.usersRepository.create(createUser);
    const hash = bcrypt.hashSync(user.password, 5);
    const userWithHash = Object.assign({}, user, { password: hash });
    return await this.usersRepository.save(userWithHash);
  }

  async createWithCode(
    createUserWithCode: CreateUserWithCodeInput,
  ): Promise<User> {
    const { email, code } = createUserWithCode;
    const codeRedis = await this.cache.get(LOGIN_OTP_PREFIX + email);
    if (codeRedis !== code) {
      throw new Error();
    }
    return await this.create(createUserWithCode);
  }

  async sendRegisterEmail(email: string): Promise<string> {
    const otp = randomize('0', 6);
    const codeOfStore = await this.cache.get(LOGIN_OTP_PREFIX + email);
    if (codeOfStore) {
      throw new Error();
    }
    await this.cache.set(LOGIN_OTP_PREFIX + email, otp, { ttl: 24 * 60 * 60 });
    const result = await this.mailerService.sendRegisterEmailTemplate(email);
    return result.response;
  }

  async findByUid(uid: string): Promise<User> {
    return await this.usersRepository.findOne(uid);
  }
}
