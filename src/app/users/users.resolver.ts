import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(@Args('uid') uid: string): Promise<User> {
    const user = await this.usersService.findUserByUid(uid);
    return user;
  }
}
