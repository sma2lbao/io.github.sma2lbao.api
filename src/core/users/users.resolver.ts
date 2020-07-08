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
import * as moment from 'moment';
import { CurrUser } from '../auth/decorators/auth.decorator';
import { GqlJwtAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Query(() => User, { description: 'find user by uid.' })
  async user(@Args('uid') uid: string): Promise<User> {
    const user = await this.usersService.findByUid(uid);
    return user;
  }

  @Query(() => UserPaginated, { description: 'all user with paginated.' })
  async users_paginated(
    @Args({ name: 'first', type: () => Int, nullable: true }) frist: number,
    @Args('after', { nullable: true }) after: string,
  ): Promise<UserPaginated> {
    const [users, total]: [
      User[],
      number,
    ] = await this.usersService.findPagitionByDate(
      frist,
      after
        ? moment(Buffer.from(after, 'base64').toString('ascii'), 'x').toDate()
        : undefined,
    );
    const result: UserPaginated = {
      edges: users.map(user => {
        return {
          node: user,
          cursor: Buffer.from(moment(user.create_at).format('x')).toString(
            'base64',
          ),
        };
      }),
      hasNextPage: total > users.length,
    };
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
  @Mutation(() => String)
  async update_user(
    @CurrUser() curr_user: User,
    @Args('user') updateUser: UpdateUserInput,
  ): Promise<boolean> {
    const result = await this.usersService.updateByUid(
      curr_user.uid,
      updateUser,
    );
    if (result.affected) {
      return true;
    } else {
      return false;
    }
  }

  @Subscription(() => User)
  user_created() {
    return this.pubsub.asyncIterator(USER_CREATED);
  }
}
