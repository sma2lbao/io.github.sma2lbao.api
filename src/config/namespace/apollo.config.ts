import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('apollo', () => ({
  key: env.APOLLO_KEY || '',
  apiKey: env.APOLLO_API_KEY,
  graphVariant: env.APOLLO_GRAPH_VARIANT,
}));
