import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '../auth.service';
import { User } from '@/core/users/entities/user.entity';
import { ThirdPlatformService } from '@/core/users/third-platform.service';
import { ThirdPlatformEnum } from '@/core/users/interfaces/users.interface';
import {
  CreateThirdPlatformInput,
  CreateThirdUserInput,
} from '@/core/users/dto/users.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly authService: AuthService,
    private readonly thirdPlatformService: ThirdPlatformService,
  ) {
    super({
      clientID: '8d3cc2e9f1558ae6aaab',
      clientSecret: '790358110f41b8b054d60de10ba3f6b943c1b8b8',
      scope: ['user:email'],
      callbackURL: 'http://127.0.0.1:3001/auth/github/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<User | undefined> {
    const { id, username, emails, photos } = profile;
    const thirdPlatform = await this.thirdPlatformService.findByOpenidAndPlatform(
      id,
      ThirdPlatformEnum.GITHUB,
    );
    if (!thirdPlatform) {
      const thirdUserInput: CreateThirdUserInput = {
        email: (emails && emails[0].value) || undefined,
        avatar: (photos && photos[0].value) || undefined,
        nickname: username,
      };
      const thirdPlatformInput: CreateThirdPlatformInput = {
        openid: id,
        description: '',
        platform: ThirdPlatformEnum.GITHUB,
        user: thirdUserInput,
      };
      const newThirdPlatform = await this.thirdPlatformService.create(
        thirdPlatformInput,
      );
      return newThirdPlatform.user;
    }
    return thirdPlatform.user;
  }
}
