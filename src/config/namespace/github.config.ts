import { registerAs } from "@nestjs/config";

const { env } = process

export default registerAs("github", () => ({
  authUrl: env.GITHUB_AUTH_URL,
  tokenUrl: env.GITHUB_TOKEN_URL,
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
  callbackUrl: env.GITHUB_CALLBACK_URL,
  failureUrl: env.GITHUB_FAILURE_URL,
  scope: env.GITHUB_SCOPE
}));
