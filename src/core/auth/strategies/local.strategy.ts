import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@/core/users/entities/user.entity';
import { UserUnauthorized } from '@/global/exceptions/users/user.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.authService.validateLocalUser(username, password);
    if (!user) {
      throw new UserUnauthorized();
    }
    return user;
  }
}
