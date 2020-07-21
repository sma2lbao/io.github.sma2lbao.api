import { Injectable, Inject, CACHE_MANAGER, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, MoreThan, UpdateResult, FindConditions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserInput,
  CreateUserWithCodeInput,
  UpdateUserInput,
} from './dto/users.dto';
import { Cache } from 'cache-manager';
import { REGISTER_OTP_PREFIX } from './constants/users.constant';
import { MailerService } from '../mailer/mailer.service';
import * as randomize from 'randomatic';
import * as bcrypt from 'bcrypt';
import { BaseService } from '@/global/services/base.service';
import {
  UserNotFound,
  RegisterOtpDifferent,
  RegisterOtpNotExpired,
} from '@/global/exceptions/users/user.exception';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly mailerService: MailerService,
  ) {
    super(userRepository);
  }

  findUserByToken(token: string): any {
    throw new Error('Method not implemented.');
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    const user: User = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UserNotFound();
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      throw new UserNotFound();
    }
    return user;
  }

  async create(createUser: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(createUser);
    const hash = bcrypt.hashSync(user.password, 5);
    const userWithHash = Object.assign({}, user, { password: hash });
    return await this.userRepository.save(userWithHash);
  }

  async createWithCode(
    createUserWithCode: CreateUserWithCodeInput,
  ): Promise<User> {
    const { email, code } = createUserWithCode;
    const codeRedis = await this.cache.get(REGISTER_OTP_PREFIX + email);
    if (codeRedis !== code) {
      throw new RegisterOtpDifferent();
    }
    return await this.create(createUserWithCode);
  }

  async sendRegisterEmail(email: string): Promise<string> {
    const otp = randomize('0', 6);
    const codeOfStore = await this.cache.get(REGISTER_OTP_PREFIX + email);
    if (codeOfStore) {
      throw new RegisterOtpNotExpired();
    }
    await this.cache.set(REGISTER_OTP_PREFIX + email, otp, {
      ttl: 24 * 60 * 60,
    });
    const result = await this.mailerService.sendRegisterEmailTemplate(email);
    return result.response;
  }

  async findByUid(uid: string): Promise<User> {
    return await this.userRepository.findOne(uid);
  }

  async updateByUid(uid: string, updateUser: UpdateUserInput): Promise<User> {
    const currUser = await this.findByUid(uid);
    if (!currUser) {
      throw new UserNotFound();
    }
    const saveUser = updateUser;
    if (updateUser.password) {
      const hash = bcrypt.hashSync(updateUser.password, 5);
      Object.assign(saveUser, { password: hash });
    }
    const toSaveUser = this.userRepository.merge(currUser, saveUser);
    return await this.userRepository.save(toSaveUser);
  }
}
