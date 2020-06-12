import { Resolver, Query, Args, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../graphql/constants/graphql.constant';
import { PubSub } from 'graphql-subscriptions';
import { USER_CREATED } from './constants/users.constant';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Query(returns => User)
  async user(@Args('uid') uid: string): Promise<User> {
    const user = await this.usersService.findUserByUid(uid);
    return user;
  }

  @Subscription(returns => User)
  user_created() {
    return this.pubsub.asyncIterator(USER_CREATED);
  }
}
