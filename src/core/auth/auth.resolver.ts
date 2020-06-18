import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException, UseGuards, Inject } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { GqlJwtAuthGuard } from './guards/gql-auth.guard';
import { CurrUser } from './decorators/auth.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string | undefined> {
    const user = await this.authService.validateLocalUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { access_token } = await this.authService.login(user);
    return access_token;
  }

  @Query(returns => User)
  @UseGuards(GqlJwtAuthGuard)
  async me(@CurrUser() user: User): Promise<User> {
    return user;
  }
}
