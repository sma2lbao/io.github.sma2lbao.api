import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('github', () => ({
  clientId: env.THIRD_GITHUB_CLIENT_ID,
  clientSecret: env.THIRD_GITHUB_CLIENT_SECRET,
  callbackUrl: env.THIRD_GITHUB_CALLBACK_URL,
}));
