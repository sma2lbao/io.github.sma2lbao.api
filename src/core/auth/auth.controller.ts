import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(AuthGuard('google'))
  // @Get('/google')
  // google(): string {
  //   return 'loading...';
  // }

  // @UseGuards(AuthGuard('google'))
  // @Get('/google/redirect')
  // //   @Render('oauth-callback')
  // async googleCallback(@Req() req): Promise<any> {
  //   console.log('req:', req);
  //   try {
  //     const { access_token } = await this.authService.login(req.user);
  //     return { access_token, error: '' };
  //   } catch (error) {
  //     return { access_token: '', error: '登录失败' };
  //   }
  // }

  @UseGuards(AuthGuard('github'))
  @Get('/github')
  github(): string {
    return 'loading...';
  }

  @UseGuards(AuthGuard('github'))
  @Get('/github/callback')
  async githubCallback(@Req() req): Promise<any> {
    // console.log('req:', req);
    return await this.authService.login(req.user);
  }
}
