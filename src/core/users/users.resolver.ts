import { Resolver, Query, Args, Subscription, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../graphql/constants/graphql.constant';
import { PubSub } from 'graphql-subscriptions';
import { USER_CREATED } from './constants/users.constant';
import { CreateUserInput, CreateUserWithCodeInput } from './dto/users.dto';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Query(returns => User, { description: 'find user by uid.' })
  async user(@Args('uid') uid: string): Promise<User> {
    const user = await this.usersService.findUserByUid(uid);
    return user;
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
