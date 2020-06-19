import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserJwtPayload } from '../interfaces/auth.interface';
import { JWT_SECRET } from '../auth.constants';
import { User } from '@/core/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(userPayload: UserJwtPayload): Promise<User | undefined> {
    const user = await this.authService.validateJwtUser(userPayload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
