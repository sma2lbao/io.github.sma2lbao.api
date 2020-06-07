import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthenticationError } from 'apollo-server-core';
import { AuthService } from '../auth.service';
import { jwtConstants, UserJwtPayload } from '../interfaces/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(userPayload: UserJwtPayload) {
    const { uid } = userPayload;
    const user = await this.authService.getUserByUid(uid);
    // if (!user) {
    //   throw new AuthenticationError('认证失败');
    // }
    return user;
  }
}
