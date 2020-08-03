import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { User } from '@/core/users/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '1051080979985-tnq1eetefq4ll2mi2ts35shhdifok4j3.apps.googleusercontent.com',
      clientSecret: 'C51c_FWfOwmuF5Ue9v-lLzS_',
      callbackURL: 'http://localhost:3001/auth/google/redirect',
      scope: ['email', 'profile', 'openid'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('profile: ', profile);
    // const user = null;
    // // const user = await this.authService.validateJwtUser(userPayload);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
