import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException, UseGuards, Inject } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { GqlJwtAuthGuard } from './guards/auth.guard';
import { CurrUser } from './decorators/auth.decorator';
import { PlatformAuthWay } from './dto/auth.dto';
import { ThirdPlatformEnum } from '../users/interfaces/users.interface';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
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

  @Query(() => User)
  @UseGuards(GqlJwtAuthGuard)
  async me(@CurrUser() user: User): Promise<User> {
    return user;
  }

  @Query(() => [PlatformAuthWay])
  async platform_auth_way(@Context() context): Promise<PlatformAuthWay[]> {
    console.log(context.req.headers.origin);
    return [
      {
        platform: ThirdPlatformEnum.GITHUB,
        url: '/auth/github',
      },
    ];
  }
}
