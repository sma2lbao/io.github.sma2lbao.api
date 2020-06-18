import {
  Resolver,
  Query,
  Args,
  Subscription,
  Mutation,
  Int,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../graphql/constants/graphql.constant';
import { PubSub } from 'graphql-subscriptions';
import { USER_CREATED } from './constants/users.constant';
import {
  CreateUserInput,
  CreateUserWithCodeInput,
  UserPaginated,
} from './dto/users.dto';
import * as moment from 'moment';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Query(returns => User, { description: 'find user by uid.' })
  async user(@Args('uid') uid: string): Promise<User> {
    const user = await this.usersService.findByUid(uid);
    return user;
  }

  @Query(returns => UserPaginated, { description: 'all user with paginated.' })
  async users_paginated(
    @Args({ name: 'first', type: () => Int, nullable: true }) frist: number,
    @Args('after', { nullable: true }) after: string,
  ): Promise<UserPaginated> {
    const [users, total]: [
      User[],
      number,
    ] = await this.usersService.findPagitionByUid(
      frist,
      after ? after : undefined,
    );
    return {
      edges: users.map(user => {
        console.log(user.uid);
        return {
          node: user,
          cursor: user.uid,
        };
      }),
      totalCount: total,
    } as UserPaginated;
  }

  @Query(returns => UserPaginated, { description: 'all user with paginated.' })
  async users_paginated_date(
    @Args({ name: 'first', type: () => Int, nullable: true }) frist: number,
    @Args('after', { nullable: true }) after: string,
  ): Promise<UserPaginated> {
    const [users, total]: [
      User[],
      number,
    ] = await this.usersService.findPagitionByDate(
      frist,
      after ? moment(after, 'x').toDate() : undefined,
    );
    return {
      edges: users.map(user => {
        return {
          node: user,
          cursor: moment(user.create_at).format('x'),
        };
      }),
      totalCount: total,
    } as UserPaginated;
  }

  @Mutation(returns => User, { description: 'create user.' })
  async create_user(@Args('user') createUser: CreateUserInput): Promise<User> {
    const user = await this.usersService.create(createUser);
    return user;
  }

  @Mutation(returns => User, { description: 'create user with verif code.' })
  async create_user_with_code(
    @Args('user') createUserWithCode: CreateUserWithCodeInput,
  ): Promise<User> {
    const user = await this.usersService.createWithCode(createUserWithCode);
    return user;
  }

  @Mutation(returns => String)
  async send_register_email(@Args('email') email: string): Promise<string> {
    return this.usersService.sendRegisterEmail(email);
  }

  @Subscription(returns => User)
  user_created() {
    return this.pubsub.asyncIterator(USER_CREATED);
  }
}
