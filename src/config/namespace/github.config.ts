import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('github', () => ({
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
  callbackUrl: env.GITHUB_CALLBACK_URL,
}));
