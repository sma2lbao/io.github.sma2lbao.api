import { Resolver, Query, Args, Subscription, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { PUB_SUB } from '../graphql/constants/graphql.constant';
import { PubSub } from 'graphql-subscriptions';
import { USER_CREATED } from './constants/users.constant';
import {
  CreateUserInput,
  CreateUserWithCodeInput,
  UserPaginated,
  UpdateUserInput,
} from './dto/users.dto';
import { CurrUser } from '../auth/decorators/auth.decorator';
import { GqlJwtAuthGuard } from '../auth/guards/auth.guard';
import { PaginatedQuery } from '@/global/dto/paginated.dto';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Query(() => Boolean, { description: 'find username exit.' })
  async has_username(@Args('username') username: string): Promise<boolean> {
    const exitCount = await this.usersService.count({
      username,
    });
    return exitCount > 0 ? true : false;
  }

  @Query(() => User, { description: 'find user by uid or username.' })
  async user(
    @Args('uid', { nullable: true }) uid: string,
    @Args('username', { nullable: true }) username: string,
  ): Promise<User> {
    if (uid) {
      return await this.usersService.findByUid(uid);
    } else {
      return await this.usersService.findOne({
        username,
      });
    }
  }

  @Query(() => UserPaginated, { description: 'all user with paginated.' })
  async users_paginated(
    @Args('query', { nullable: true }) query?: PaginatedQuery,
  ): Promise<UserPaginated> {
    const result = await this.usersService.findCursorPagition({
      query: query,
      key: 'create_at',
    });
    return result;
  }

  @Mutation(() => User, { description: 'create user.' })
  async create_user(@Args('user') createUser: CreateUserInput): Promise<User> {
    const user = await this.usersService.create(createUser);
    return user;
  }

  @Mutation(() => User, { description: 'create user with verif code.' })
  async create_user_with_code(
    @Args('user') createUserWithCode: CreateUserWithCodeInput,
  ): Promise<User> {
    const user = await this.usersService.createWithCode(createUserWithCode);
    return user;
  }

  @Mutation(() => Boolean)
  async send_register_email(@Args('email') email: string): Promise<string> {
    return this.usersService.sendRegisterEmail(email);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => User)
  async update_user(
    @CurrUser() curr_user: User,
    @Args('user') updateUser: UpdateUserInput,
  ): Promise<User> {
    return await this.usersService.updateByUid(curr_user.uid, updateUser);
  }

  @Subscription(() => User)
  user_created() {
    return this.pubsub.asyncIterator(USER_CREATED);
  }
}
